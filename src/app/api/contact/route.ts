// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import transporter from '../../../lib/nodemailer';
import { contactServices } from '../../../lib/contact-services';

// Define the contact interface
export interface IContact {
  name: string;
  email: string;
  phone?: string;
  services: string[];
  message: string;
  subject: string;
  company?: string;
  role?: string;
  website?: string;
  budget?: string;
  timeline?: string;
  contactMethod?: string;
  referral?: string;
  discoveryCall?: boolean;
  nda?: boolean;
  createdAt: Date;
}

export async function POST(request: NextRequest) {
  // Skip MongoDB operations during build time
  if (process.env.NODE_ENV === 'production' && !request.method) {
    return NextResponse.json({ message: 'Build-time placeholder' }, { status: 200 });
  }

  try {
    // Parse and validate request body
    const body = (await request.json()) as Partial<IContact> & {
      services?: unknown;
    };

    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const subject = typeof body.subject === 'string' ? body.subject.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';
    const services = Array.isArray(body.services)
      ? body.services.filter((s): s is string => typeof s === 'string' && contactServices.some((service) => service.label === s))
      : [];

    if (!name || !email || services.length === 0 || !subject || message.length < 10) {
      return NextResponse.json({ message: 'Please provide your name, a valid email, a project subject, a service, and a project description.' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email) || email.length > 254) {
      return NextResponse.json({ message: 'Please enter a valid email' }, { status: 400 });
    }

    if (name.length > 120 || subject.length > 160 || message.length > 5000) {
      return NextResponse.json(
        { message: 'Please shorten your name, subject, or project description and try again.' },
        { status: 400 }
      );
    }

    // Escape user-provided values before inserting them into the notification email HTML.
    const htmlEntities: Record<string, string> = {
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    };
    const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (character) => htmlEntities[character]);
    const safe = (value: unknown) => escapeHtml(typeof value === 'string' ? value : '');
    const safeMessage = escapeHtml(message).replace(/\r?\n/g, '<br>');

    // Prepare contact data
    const contactData: IContact = {
      name,
      email,
      subject,
      phone: typeof body.phone === 'string' ? body.phone : '',
      services,
      message,
      company: typeof body.company === 'string' ? body.company : '',
      role: typeof body.role === 'string' ? body.role : '',
      website: typeof body.website === 'string' ? body.website : '',
      budget: typeof body.budget === 'string' ? body.budget : '',
      timeline: typeof body.timeline === 'string' ? body.timeline : '',
      contactMethod: typeof body.contactMethod === 'string' ? body.contactMethod : '',
      referral: typeof body.referral === 'string' ? body.referral : '',
      discoveryCall: Boolean(body.discoveryCall),
      nda: Boolean(body.nda),
      createdAt: new Date(),
    };

    // Connect to MongoDB
    const db = await connectToDatabase();
    const collection = db.collection('contacts');

    // Insert into MongoDB
    const result = await collection.insertOne(contactData);

    if (!result.acknowledged) {
      console.error('Failed to save contact to MongoDB:', { result });
      return NextResponse.json({ message: 'Failed to save contact' }, { status: 500 });
    }

    // Send email notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECEIVER,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Inquiry</h2>
        <p><strong>Name:</strong> ${safe(name)}</p>
        <p><strong>Email:</strong> ${safe(email)}</p>
        <p><strong>Subject:</strong> ${safe(subject)}</p>
        <p><strong>Phone:</strong> ${safe(contactData.phone) || 'Not provided'}</p>
        <p><strong>Company:</strong> ${safe(contactData.company) || 'Not provided'}</p>
        <p><strong>Role:</strong> ${safe(contactData.role) || 'Not provided'}</p>
        <p><strong>Website:</strong> ${safe(contactData.website) || 'Not provided'}</p>
        <p><strong>Budget:</strong> ${safe(contactData.budget) || 'Not provided'}</p>
        <p><strong>Timeline:</strong> ${safe(contactData.timeline) || 'Not provided'}</p>
        <p><strong>Preferred Contact:</strong> ${safe(contactData.contactMethod) || 'Not provided'}</p>
        <p><strong>Referral:</strong> ${safe(contactData.referral) || 'Not provided'}</p>
        <p><strong>Discovery Call:</strong> ${contactData.discoveryCall ? 'Yes' : 'No'}</p>
        <p><strong>NDA Required:</strong> ${contactData.nda ? 'Yes' : 'No'}</p>
        <p><strong>Services:</strong> ${services.map(escapeHtml).join(', ')}</p>
        <p><strong>Message:</strong><br>${safeMessage}</p>
        <hr>
        <p>Submitted on: ${new Date().toLocaleString()}</p>
      `,
    };

    // Validate email configuration
    if (!process.env.EMAIL_USER || !process.env.EMAIL_RECEIVER) {
      console.error('Email configuration missing:', {
        emailUser: !!process.env.EMAIL_USER,
        emailReceiver: !!process.env.EMAIL_RECEIVER,
      });
      return NextResponse.json({ message: 'Email configuration error' }, { status: 500 });
    }

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Contact saved and email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error in /api/contact:', {
      error: (error as Error).message,
      stack: (error as Error).stack,
    });
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

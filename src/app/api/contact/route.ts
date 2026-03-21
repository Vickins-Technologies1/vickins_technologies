// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import transporter from '../../../lib/nodemailer';

// Define the contact interface
export interface IContact {
  name: string;
  email: string;
  phone?: string;
  services: string[];
  message: string;
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
    const message = typeof body.message === 'string' ? body.message.trim() : '';
    const services = Array.isArray(body.services)
      ? body.services.filter((s) => typeof s === 'string' && s.trim().length > 0)
      : [];

    if (!name || !email || services.length === 0 || !message) {
      console.error('Validation failed:', { body });
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      console.error('Invalid email format:', { email });
      return NextResponse.json({ message: 'Please enter a valid email' }, { status: 400 });
    }

    // Validate message length
    if (message.length > 2000) {
      console.error('Message too long:', { length: message.length });
      return NextResponse.json(
        { message: 'Message cannot be more than 2000 characters' },
        { status: 400 }
      );
    }

    // Prepare contact data
    const contactData: IContact = {
      name,
      email,
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

    console.log('Saving contact to MongoDB:', {
      name: contactData.name,
      email: contactData.email,
      services: contactData.services,
    });

    // Connect to MongoDB
    const db = await connectToDatabase();
    const collection = db.collection('contacts');

    // Insert into MongoDB
    const result = await collection.insertOne(contactData);

    if (!result.acknowledged) {
      console.error('Failed to save contact to MongoDB:', { result });
      return NextResponse.json({ message: 'Failed to save contact' }, { status: 500 });
    }

    console.log('Contact saved successfully:', { id: result.insertedId });

    // Send email notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECEIVER,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${contactData.phone || 'Not provided'}</p>
        <p><strong>Company:</strong> ${contactData.company || 'Not provided'}</p>
        <p><strong>Role:</strong> ${contactData.role || 'Not provided'}</p>
        <p><strong>Website:</strong> ${contactData.website || 'Not provided'}</p>
        <p><strong>Budget:</strong> ${contactData.budget || 'Not provided'}</p>
        <p><strong>Timeline:</strong> ${contactData.timeline || 'Not provided'}</p>
        <p><strong>Preferred Contact:</strong> ${contactData.contactMethod || 'Not provided'}</p>
        <p><strong>Referral:</strong> ${contactData.referral || 'Not provided'}</p>
        <p><strong>Discovery Call:</strong> ${contactData.discoveryCall ? 'Yes' : 'No'}</p>
        <p><strong>NDA Required:</strong> ${contactData.nda ? 'Yes' : 'No'}</p>
        <p><strong>Services:</strong> ${services.join(', ')}</p>
        <p><strong>Message:</strong> ${message}</p>
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

    console.log('Sending email notification to:', process.env.EMAIL_RECEIVER);
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');

    return NextResponse.json({ message: 'Contact saved and email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error in /api/contact:', {
      error: (error as Error).message,
      stack: (error as Error).stack,
    });
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

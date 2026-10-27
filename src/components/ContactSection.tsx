"use client";

import { useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
  ArrowUpRight,
  Check,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { contactServices, neutralProjectTemplate } from "@/lib/contact-services";

type FormState = {
  name: string;
  email: string;
  company: string;
  role: string;
  website: string;
  budget: string;
  timeline: string;
  contactMethod: string;
  referral: string;
  subject: string;
  message: string;
  discoveryCall: boolean;
  nda: boolean;
};

const initialForm: FormState = {
  name: "", email: "", company: "", role: "", website: "", budget: "", timeline: "",
  contactMethod: "Email", referral: "", subject: "", message: "", discoveryCall: false, nda: false,
};

const fieldClass = "mt-2 w-full rounded-xl border border-[var(--glass-border-strong)] bg-[var(--glass-surface)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--foreground)]/40 focus:border-[var(--accent-sky)] focus:ring-2 focus:ring-[var(--accent-sky)]/25";
const labelClass = "block text-sm font-medium text-[var(--foreground)]";

export default function ContactSection() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [phone, setPhone] = useState<string | undefined>("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [templateSubject, setTemplateSubject] = useState("");
  const [templateMessage, setTemplateMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const reducedMotion = useReducedMotion();

  const activeService = useMemo(() => {
    const selected = selectedServices.at(-1);
    return contactServices.find((service) => service.label === selected) ?? neutralProjectTemplate;
  }, [selectedServices]);

  const setField = (name: keyof FormState, value: string | boolean) => {
    setForm((current) => ({ ...current, [name]: value }));
    if (typeof value === "string" && errors[name]) setErrors((current) => ({ ...current, [name]: "" }));
  };

  const toggleService = (service: string) => {
    const nextServices = selectedServices.includes(service)
      ? selectedServices.filter((item) => item !== service)
      : [...selectedServices, service];
    const nextActive = contactServices.find((item) => item.label === nextServices.at(-1)) ?? neutralProjectTemplate;
    const descriptionIsTemplate = !form.message || form.message === templateMessage;
    const subjectIsTemplate = !form.subject || form.subject === templateSubject;
    setSelectedServices(nextServices);
    if (descriptionIsTemplate) {
      setForm((current) => ({ ...current, message: nextServices.length ? nextActive.description : "" }));
      setTemplateMessage(nextServices.length ? nextActive.description : "");
    }
    if (subjectIsTemplate) {
      setForm((current) => ({ ...current, subject: nextServices.length ? nextActive.subject : "" }));
      setTemplateSubject(nextServices.length ? nextActive.subject : "");
    }
    setErrors((current) => ({ ...current, services: "" }));
  };

  const insertServiceTemplate = () => {
    const addition = `\n\n--- ${activeService.label} ---\n${activeService.description}`;
    setForm((current) => ({ ...current, message: current.message.trim() ? `${current.message.trim()}${addition}` : activeService.description }));
    setTemplateMessage("");
  };

  const validate = (data: FormState) => {
    const next: Record<string, string> = {};
    if (!data.name.trim()) next.name = "Please enter your name.";
    if (!data.email.trim() || !/^\S+@\S+\.\S+$/.test(data.email.trim())) next.email = "Enter a valid email address.";
    if (!selectedServices.length) next.services = "Please select at least one service.";
    if (!data.subject.trim()) next.subject = "Add a short subject for your project.";
    if (!data.message.trim() || data.message.trim().length < 10) next.message = "Tell us a little about your project (at least 10 characters).";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting || !formRef.current) return;
    // FormData reads the browser's latest autofilled values, even before React receives an input event.
    const values = new FormData(formRef.current);
    const data: FormState = {
      ...form,
      name: String(values.get("name") ?? ""),
      email: String(values.get("email") ?? ""),
      company: String(values.get("company") ?? ""),
      role: String(values.get("role") ?? ""),
      website: String(values.get("website") ?? ""),
      subject: String(values.get("subject") ?? ""),
      message: String(values.get("message") ?? ""),
    };
    if (!validate(data)) return;
    setForm(data);
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, phone, services: selectedServices }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "We couldn't send your inquiry. Please try again.");
      setSubmitStatus("success");
      setForm(initialForm);
      setPhone("");
      setSelectedServices([]);
      setTemplateMessage("");
      setTemplateSubject("");
      formRef.current?.reset();
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const errorFor = (name: string) => errors[name] ? <p id={`${name}-error`} className="mt-1.5 text-xs text-rose-600 dark:text-rose-300">{errors[name]}</p> : null;
  const enterMotion = reducedMotion ? {} : { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" }, transition: { duration: 0.5 } };

  return (
    <motion.section id="contact" {...enterMotion} className="scroll-mt-[96px] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">Let&apos;s build something great</p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">Tell us what you&apos;re building.</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--foreground)]/70">Share your project goals, the services you need, and your expected timeline. We&apos;ll review your requirements and get back to you with practical next steps.</p>
        </div>

        <div className="mt-9 grid items-start gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14">
          <aside className="lg:sticky lg:top-28">
            <div className="border-l-2 border-[var(--accent-sky)] pl-5">
              <p className="text-sm font-semibold">Talk directly with our team</p>
              <p className="mt-2 text-sm leading-6 text-[var(--foreground)]/65">Prefer a direct conversation? We&apos;re happy to hear what you have in mind.</p>
            </div>
            <div className="mt-7 space-y-5">
              <a href="mailto:info@vickinstechnologies.com" className="group flex min-w-0 items-start gap-3 rounded-xl p-2 -ml-2 transition hover:bg-[var(--hover-bg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent-sky)]">
                <Mail aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" />
                <span className="min-w-0"><span className="block text-xs text-[var(--foreground)]/55">Email us</span><span className="mt-1 block break-all text-sm font-medium group-hover:text-[var(--accent)]">info@vickinstechnologies.com</span></span><ArrowUpRight aria-hidden="true" className="ml-auto h-4 w-4 shrink-0 text-[var(--foreground)]/40" />
              </a>
              <a href="tel:+254794501005" className="group flex items-start gap-3 rounded-xl p-2 -ml-2 transition hover:bg-[var(--hover-bg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent-sky)]">
                <Phone aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" />
                <span><span className="block text-xs text-[var(--foreground)]/55">Call us</span><span className="mt-1 block text-sm font-medium group-hover:text-[var(--accent)]">+254 794 501 005</span></span><ArrowUpRight aria-hidden="true" className="ml-auto h-4 w-4 text-[var(--foreground)]/40" />
              </a>
              <a href="https://wa.me/254794501005?text=Hello%2C%20I%27d%20like%20to%20discuss%20a%20project%20with%20Vickins%20Technologies." target="_blank" rel="noreferrer" className="group flex items-start gap-3 rounded-xl p-2 -ml-2 transition hover:bg-[var(--hover-bg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent-sky)]">
                <MessageCircle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" />
                <span><span className="block text-xs text-[var(--foreground)]/55">WhatsApp</span><span className="mt-1 block text-sm font-medium group-hover:text-[var(--accent)]">Start a conversation</span></span><ArrowUpRight aria-hidden="true" className="ml-auto h-4 w-4 text-[var(--foreground)]/40" />
              </a>
              <div className="flex items-start gap-3 p-2 -ml-2"><MapPin aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" /><span><span className="block text-xs text-[var(--foreground)]/55">Based in</span><span className="mt-1 block text-sm font-medium">Ruiru, Kenya</span></span></div>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-5 border-y border-[var(--glass-border-strong)] py-5">
              <div className="flex gap-2.5"><Clock3 aria-hidden="true" className="h-4 w-4 shrink-0 text-[var(--accent)]" /><p className="text-xs leading-5 text-[var(--foreground)]/65">We reply within <strong className="text-[var(--foreground)]">24 hours</strong></p></div>
              <div className="flex gap-2.5"><ShieldCheck aria-hidden="true" className="h-4 w-4 shrink-0 text-[var(--accent)]" /><p className="text-xs leading-5 text-[var(--foreground)]/65">NDA-friendly engagements on request</p></div>
            </div>

            <div className="mt-7">
              <h3 className="text-sm font-semibold">What happens next</h3>
              <ol className="mt-4 space-y-4">
                {[
                  ["01", "Review", "We review your brief and see how our services fit your needs."],
                  ["02", "Scope", "We discuss requirements, expected timeline, and budget."],
                  ["03", "Next steps", "We agree on a delivery approach and the right next step."],
                ].map(([number, title, detail]) => <li key={number} className="flex gap-3"><span className="pt-0.5 text-xs font-semibold tabular-nums text-[var(--accent)]">{number}</span><p className="text-xs leading-5 text-[var(--foreground)]/65"><strong className="text-[var(--foreground)]">{title}.</strong> {detail}</p></li>)}
              </ol>
            </div>
          </aside>

          <div className="min-w-0 border-t border-[var(--glass-border-strong)] pt-6 lg:border-l lg:border-t-0 lg:pl-9 lg:pt-0">
            <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-7">
              <fieldset className="min-w-0">
                <legend className="text-sm font-semibold">Your details</legend>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div><label htmlFor="contact-name" className={labelClass}>Full name <span aria-hidden="true" className="text-[var(--accent)]">*</span></label><input id="contact-name" name="name" autoComplete="name" value={form.name} onChange={(e) => setField("name", e.target.value)} className={fieldClass} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />{errorFor("name")}</div>
                  <div><label htmlFor="contact-email" className={labelClass}>Business email <span aria-hidden="true" className="text-[var(--accent)]">*</span></label><input id="contact-email" name="email" type="email" autoComplete="email" value={form.email} onChange={(e) => setField("email", e.target.value)} className={fieldClass} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />{errorFor("email")}</div>
                  <div><label htmlFor="contact-phone" className={labelClass}>Phone <span className="font-normal text-[var(--foreground)]/50">(optional)</span></label><div className={`${fieldClass} flex items-center [&_.PhoneInputInput]:min-w-0 [&_.PhoneInputInput]:flex-1 [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:outline-none` }><PhoneInput id="contact-phone" name="phone" autoComplete="tel" placeholder="Add a phone number" value={phone} onChange={setPhone} defaultCountry="KE" international countryCallingCodeEditable={false} /></div></div>
                  <div><label htmlFor="contact-company" className={labelClass}>Company / organization <span className="font-normal text-[var(--foreground)]/50">(optional)</span></label><input id="contact-company" name="company" autoComplete="organization" value={form.company} onChange={(e) => setField("company", e.target.value)} className={fieldClass} /></div>
                </div>
              </fieldset>

              <fieldset className="min-w-0">
                <legend className="text-sm font-semibold">Your project</legend>
                <div className="mt-4">
                  <p className={labelClass}>Interested services <span className="text-[var(--accent)]">*</span><span className="ml-1 font-normal text-[var(--foreground)]/55">Choose all that apply</span></p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {contactServices.map((service) => {
                      const checked = selectedServices.includes(service.label);
                      return <label key={service.label} className={`flex min-h-11 cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2 text-xs leading-5 transition focus-within:ring-2 focus-within:ring-[var(--accent-sky)]/40 ${checked ? "border-[var(--accent)]/50 bg-[var(--hover-bg)]" : "border-[var(--glass-border-strong)] hover:border-[var(--accent)]/40"}`}>
                        <input type="checkbox" name="services" value={service.label} checked={checked} onChange={() => toggleService(service.label)} className="h-4 w-4 shrink-0 accent-[var(--accent)]" />{service.label}{checked && <Check aria-hidden="true" className="ml-auto h-4 w-4 shrink-0 text-[var(--accent)]" />}
                      </label>;
                    })}
                  </div>
                  {errorFor("services")}
                </div>

                <div className="mt-4"><label htmlFor="contact-subject" className={labelClass}>Project subject <span className="text-[var(--accent)]">*</span></label><input id="contact-subject" name="subject" maxLength={160} value={form.subject} onChange={(e) => setField("subject", e.target.value)} className={fieldClass} aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? "subject-error" : undefined} />{errorFor("subject")}</div>
                <div className="mt-4"><label htmlFor="contact-message" className={labelClass}>Project description <span className="text-[var(--accent)]">*</span></label><textarea id="contact-message" name="message" rows={8} maxLength={5000} value={form.message} onChange={(e) => { setField("message", e.target.value); if (templateMessage && e.target.value !== templateMessage) setTemplateMessage(""); }} placeholder="Tell us about the problem, your goals, and what a good outcome looks like." className={`${fieldClass} min-h-52 resize-y leading-6`} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : "message-help"} />{errorFor("message")}<div className="mt-2 flex flex-wrap items-center justify-between gap-2"><p id="message-help" className="text-xs text-[var(--foreground)]/55">The suggested outline is editable. Please leave out passwords or other secrets.</p>{selectedServices.length > 0 && form.message !== templateMessage && <button type="button" onClick={insertServiceTemplate} className="text-left text-xs font-semibold text-[var(--accent)] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent-sky)]">Insert {activeService.label} outline</button>}</div></div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div><label htmlFor="contact-budget" className={labelClass}>Budget range <span className="font-normal text-[var(--foreground)]/50">(optional)</span></label><select id="contact-budget" name="budget" value={form.budget} onChange={(e) => setField("budget", e.target.value)} className={fieldClass}><option value="">Choose a range</option><option>Under KES 30,000</option><option>KES 30,000–80,000</option><option>KES 80,000–150,000</option><option>KES 150,000–300,000</option><option>KES 300,000–750,000</option><option>KES 750,000+</option><option>Not sure yet</option></select></div>
                  <div><label htmlFor="contact-timeline" className={labelClass}>Preferred timeline <span className="font-normal text-[var(--foreground)]/50">(optional)</span></label><select id="contact-timeline" name="timeline" value={form.timeline} onChange={(e) => setField("timeline", e.target.value)} className={fieldClass}><option value="">Choose a timeline</option><option>As soon as possible</option><option>Within 2–4 weeks</option><option>Within 1–3 months</option><option>Flexible / Still planning</option></select></div>
                </div>
                <details className="mt-4 rounded-xl border border-[var(--glass-border-strong)] px-4 py-3"><summary className="cursor-pointer text-xs font-medium text-[var(--foreground)]/70">A few optional details</summary><div className="mt-4 grid gap-4 sm:grid-cols-2"><div><label htmlFor="contact-role" className={labelClass}>Your role</label><input id="contact-role" name="role" autoComplete="organization-title" value={form.role} onChange={(e) => setField("role", e.target.value)} className={fieldClass} /></div><div><label htmlFor="contact-website" className={labelClass}>Current website</label><input id="contact-website" name="website" type="url" autoComplete="url" value={form.website} onChange={(e) => setField("website", e.target.value)} className={fieldClass} /></div><div><label htmlFor="contact-method" className={labelClass}>Preferred contact</label><select id="contact-method" name="contactMethod" value={form.contactMethod} onChange={(e) => setField("contactMethod", e.target.value)} className={fieldClass}><option>Email</option><option>Phone</option><option>WhatsApp</option></select></div><div><label htmlFor="contact-referral" className={labelClass}>How did you hear about us?</label><select id="contact-referral" name="referral" value={form.referral} onChange={(e) => setField("referral", e.target.value)} className={fieldClass}><option value="">Choose one</option><option>Referral</option><option>Social Media</option><option>Search</option><option>Event</option><option>Other</option></select></div></div></details>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-xs text-[var(--foreground)]/70"><label className="flex min-h-11 cursor-pointer items-center gap-2"><input type="checkbox" name="discoveryCall" checked={form.discoveryCall} onChange={(e) => setField("discoveryCall", e.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />I&apos;d like a discovery call</label><label className="flex min-h-11 cursor-pointer items-center gap-2"><input type="checkbox" name="nda" checked={form.nda} onChange={(e) => setField("nda", e.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />I&apos;d like to discuss an NDA</label></div>
              </fieldset>

              <div>
                <button type="submit" disabled={isSubmitting} aria-live="polite" className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--button-bg)] px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-tight)] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-sky)] disabled:cursor-wait disabled:opacity-70">{isSubmitting ? "Sending your inquiry…" : "Send project inquiry"}{!isSubmitting && <ArrowUpRight aria-hidden="true" className="h-4 w-4" />}</button>
                {submitStatus === "success" && <p role="status" aria-live="polite" className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm leading-6"><strong>Thank you for reaching out.</strong><br />We&apos;ve received your project inquiry and will review the details. Our team will get back to you with practical next steps.</p>}
                {submitStatus === "error" && <p role="alert" className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm leading-6">{errorMessage || "We couldn't send your inquiry. Please try again or email us at info@vickinstechnologies.com."}</p>}
                <p className="mt-3 text-center text-xs text-[var(--foreground)]/55">Your project details are used to respond to your inquiry. We don&apos;t ask for passwords or access credentials.</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

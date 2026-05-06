import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import {
  PencilSquareIcon,
  SparklesIcon,
  CalendarDaysIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

export default function ContactSection() {
  const [phone, setPhone] = useState<string | undefined>("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [editorMode, setEditorMode] = useState<"write" | "preview">("write");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    website: "",
    budget: "",
    timeline: "",
    contactMethod: "Email",
    referral: "",
    message: "",
    discoveryCall: false,
    nda: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const servicesList = [
    "Web Platform",
    "Mobile App",
    "Automation & AI",
    "Cloud & DevOps",
    "Brand & UI Systems",
    "Data & Analytics",
    "Security & Compliance",
    "CCTV Surveillance",
    "Biometric Systems",
    "Electric Fence",
    "Electric Gates",
    "Intruder Alarms",
    "Access Control",
    "Video Intercom",
    "Fire Alarm Systems",
    "Perimeter Security",
    "Security Lighting",
    "24/7 Monitoring & Support",
    "Monitoring & Maintenance",
    "E-commerce",
    "Custom Software",
    "Consulting",
  ];

  const handleServiceChange = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggle = (name: "discoveryCall" | "nda") => {
    setFormData((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const renderPreview = useMemo(() => {
    const escapeHtml = (input: string) =>
      input.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const formatInline = (line: string) =>
      line
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.+?)\*/g, "<em>$1</em>")
        .replace(/`(.+?)`/g, "<code>$1</code>");

    const lines = escapeHtml(formData.message).split(/\n/);
    let html = "";
    let inList = false;

    lines.forEach((raw) => {
      const line = raw.trimEnd();
      if (/^###\s+/.test(line)) {
        if (inList) {
          html += "</ul>";
          inList = false;
        }
        html += `<h3>${formatInline(line.replace(/^###\s+/, ""))}</h3>`;
        return;
      }
      if (/^##\s+/.test(line)) {
        if (inList) {
          html += "</ul>";
          inList = false;
        }
        html += `<h2>${formatInline(line.replace(/^##\s+/, ""))}</h2>`;
        return;
      }
      if (/^#\s+/.test(line)) {
        if (inList) {
          html += "</ul>";
          inList = false;
        }
        html += `<h1>${formatInline(line.replace(/^#\s+/, ""))}</h1>`;
        return;
      }
      if (/^\-\s+/.test(line)) {
        if (!inList) {
          html += "<ul>";
          inList = true;
        }
        html += `<li>${formatInline(line.replace(/^\-\s+/, ""))}</li>`;
        return;
      }
      if (inList) {
        html += "</ul>";
        inList = false;
      }
      if (line.length === 0) {
        html += "<br />";
        return;
      }
      html += `<p>${formatInline(line)}</p>`;
    });

    if (inList) html += "</ul>";
    return html;
  }, [formData.message]);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage(null);
    if (selectedServices.length === 0) {
      setSubmitStatus("error");
      setErrorMessage("Please select at least one service.");
      setIsSubmitting(false);
      return;
    }
    try {
      const body = {
        ...formData,
        phone,
        services: selectedServices,
      };
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          company: "",
          role: "",
          website: "",
          budget: "",
          timeline: "",
          contactMethod: "Email",
          referral: "",
          message: "",
          discoveryCall: false,
          nda: false,
        });
        setPhone("");
        setSelectedServices([]);
      } else {
        setSubmitStatus("error");
        setErrorMessage(result.message || "Error sending message. Please try again.");
      }
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      id="contact"
      className="py-8 sm:py-10 lg:py-12 scroll-mt-[96px]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center max-w-3xl mx-auto">
        <p className="text-[10px] uppercase tracking-[0.34em] text-[var(--accent)]">Contact</p>
        <h2 className="text-2xl sm:text-3xl font-semibold mt-3">Tell us what you’re building.</h2>
        <p className="text-[15px] text-[var(--foreground)]/78 mt-3">
          Share scope and timeline. We reply with next steps.
        </p>
      </div>

      <div className="max-w-6xl mx-auto mt-8">
        <div className="relative overflow-hidden rounded-3xl border border-[var(--glass-border)] bg-[var(--card-bg)] backdrop-blur-2xl shadow-[var(--shadow-soft)]">
          <div className="absolute inset-0 bg-gradient-to-br from-white/6 via-transparent to-transparent opacity-80" />
          <div className="relative z-10 p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-[var(--glass-surface)] border border-[var(--glass-border)]">
                  <SparklesIcon className="h-5 w-5 text-[var(--accent)]" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.34em] text-[var(--accent)]">Project brief</p>
                  <p className="text-sm text-[var(--foreground)]/70">We reply within 24 hours.</p>
                </div>
              </div>
              <div className="hidden lg:flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[var(--foreground)]/50">
                <PencilSquareIcon className="h-4 w-4" />
                Full Brief Editor
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-8">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-surface)] p-5 shadow-[var(--shadow-tight)]"
                >
                  <h3 className="text-sm uppercase tracking-[0.28em] text-[var(--foreground)]/60">
                    Contact Information
                  </h3>
                  <div className="mt-4 space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <EnvelopeIcon className="h-5 w-5 text-[var(--button-bg)]" />
                      <a
                        href="mailto:info@vickinstechnologies.com"
                        className="hover:text-[var(--button-bg)] transition duration-300"
                      >
                        info@vickinstechnologies.com
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <PhoneIcon className="h-5 w-5 text-[var(--button-bg)]" />
                      <a
                        href="tel:+254794501005"
                        className="hover:text-[var(--button-bg)] transition duration-300"
                      >
                        +254 794 501 005
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPinIcon className="h-5 w-5 text-[var(--button-bg)]" />
                      <span>Ruiru, Kenya</span>
                    </div>
                  </div>
                </motion.div>

                <div className="rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-surface)] p-5 shadow-[var(--shadow-tight)]">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-[var(--foreground)]/60">
                    <CalendarDaysIcon className="h-4 w-4" />
                    Engagement Snapshot
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-xs text-[var(--foreground)]/70">
                    <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-surface)] p-3">
                      Response time: <span className="font-semibold text-[var(--foreground)]">24 hrs</span>
                    </div>
                    <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-surface)] p-3">
                      Start window: <span className="font-semibold text-[var(--foreground)]">1-3 wks</span>
                    </div>
                    <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-surface)] p-3">
                      Project length: <span className="font-semibold text-[var(--foreground)]">4-12 wks</span>
                    </div>
                    <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-surface)] p-3">
                      Support: <span className="font-semibold text-[var(--foreground)]">Ongoing</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-xs text-[var(--foreground)]/60">
                    <ShieldCheckIcon className="h-4 w-4" />
                    NDA-friendly engagements on request.
                  </div>
                </div>

                <div className="rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-surface)] p-5 shadow-[var(--shadow-tight)]">
                  <h4 className="text-xs uppercase tracking-[0.28em] text-[var(--foreground)]/60">What happens next</h4>
                  <ul className="mt-4 space-y-3 text-sm text-[var(--foreground)]/70">
                    <li className="flex items-start gap-2">
                      <CheckCircleIcon className="h-4 w-4 text-[var(--button-bg)] mt-0.5" />
                      We review your brief and confirm scope alignment.
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircleIcon className="h-4 w-4 text-[var(--button-bg)] mt-0.5" />
                      We send scope, timeline, and a cost range.
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircleIcon className="h-4 w-4 text-[var(--button-bg)] mt-0.5" />
                      We schedule a kickoff call and finalize next steps.
                    </li>
                  </ul>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-surface)] p-6 shadow-[var(--shadow-tight)]"
              >
                <h3 className="text-sm uppercase tracking-[0.28em] text-[var(--foreground)]/60 mb-4">
                  Project Brief
                </h3>
                <form className="space-y-4" onSubmit={handleContactSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your Name"
                      className="w-full p-3 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)] text-sm"
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Your Email"
                      className="w-full p-3 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)] text-sm"
                      required
                    />
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Company"
                      className="w-full p-3 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)] text-sm"
                    />
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      placeholder="Role / Title"
                      className="w-full p-3 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)] text-sm"
                    />
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="Company Website"
                      className="w-full p-3 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)] text-sm"
                    />
                    <div className="flex items-center gap-3 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-surface)] px-3 py-2 focus-within:ring-2 focus-within:ring-[var(--button-bg)]">
                      <PhoneIcon className="h-4 w-4 text-[var(--button-bg)]" />
                      <PhoneInput
                        placeholder="Phone Number"
                        value={phone}
                        onChange={setPhone}
                        defaultCountry="KE"
                        international
                        countryCallingCodeEditable={false}
                        className="w-full text-sm bg-transparent focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)] text-sm"
                    >
                      <option value="">Budget Range</option>
                      <option value="Under KES 30k">Under KES 30k</option>
                      <option value="KES 30k-80k">KES 30k - 80k</option>
                      <option value="KES 80k-150k">KES 80k - 150k</option>
                      <option value="KES 150k-300k">KES 150k - 300k</option>
                      <option value="KES 300k+">KES 300k+</option>
                    </select>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)] text-sm"
                    >
                      <option value="">Timeline</option>
                      <option value="ASAP">ASAP</option>
                      <option value="2-4 weeks">2-4 weeks</option>
                      <option value="1-2 months">1-2 months</option>
                      <option value="3+ months">3+ months</option>
                    </select>
                    <select
                      name="contactMethod"
                      value={formData.contactMethod}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)] text-sm"
                    >
                      <option value="Email">Preferred Contact: Email</option>
                      <option value="Phone">Preferred Contact: Phone</option>
                      <option value="WhatsApp">Preferred Contact: WhatsApp</option>
                    </select>
                    <select
                      name="referral"
                      value={formData.referral}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)] text-sm"
                    >
                      <option value="">How did you hear about us?</option>
                      <option value="Referral">Referral</option>
                      <option value="Social Media">Social Media</option>
                      <option value="Search">Search</option>
                      <option value="Event">Event</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <h4 className="text-xs uppercase tracking-[0.28em] text-[var(--foreground)]/60">
                    Interested Services
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-32 overflow-y-auto pr-2">
                    {servicesList.map((service, index) => (
                      <label
                        key={service}
                        htmlFor={`service-${index}`}
                        className="flex items-center cursor-pointer select-none text-xs w-full p-2 rounded-lg hover:bg-[var(--hover-bg)] transition-all duration-200"
                      >
                        <input
                          id={`service-${index}`}
                          type="checkbox"
                          value={service}
                          checked={selectedServices.includes(service)}
                          onChange={() => handleServiceChange(service)}
                          className="hidden"
                        />
                        <span
                          className={`w-5 h-5 mr-3 border-2 rounded flex items-center justify-center transition-all duration-200 ${
                            selectedServices.includes(service)
                              ? "bg-[var(--button-bg)] border-[var(--button-bg)]"
                              : "border-[var(--navbar-text)]/40"
                          }`}
                        >
                          <CheckCircleIcon
                            className={`h-4 w-4 ${
                              selectedServices.includes(service)
                                ? "text-white"
                                : "text-[var(--navbar-text)]/40"
                            } transition-all duration-200`}
                          />
                        </span>
                        <span className="text-[var(--navbar-text)]">{service}</span>
                      </label>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-surface)] p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setEditorMode("write")}
                          className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-semibold transition ${
                            editorMode === "write"
                              ? "bg-[var(--button-bg)] text-white"
                              : "bg-[var(--glass-surface)] text-[var(--foreground)]/70 hover:bg-[var(--glass-surface-strong)]"
                          }`}
                        >
                          Write
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditorMode("preview")}
                          className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-semibold transition ${
                            editorMode === "preview"
                              ? "bg-[var(--button-bg)] text-white"
                              : "bg-[var(--glass-surface)] text-[var(--foreground)]/70 hover:bg-[var(--glass-surface-strong)]"
                          }`}
                        >
                          Preview
                        </button>
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--foreground)]/50">
                        Markdown
                      </span>
                    </div>

                    {editorMode === "write" ? (
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us your goals, timeline, and scope."
                        className="w-full min-h-[140px] bg-transparent focus:outline-none text-sm text-[var(--foreground)]/90"
                        required
                      />
                    ) : (
                      <div
                        className="min-h-[140px] text-sm text-[var(--foreground)]/80 leading-relaxed space-y-2 [&_h1]:text-lg [&_h1]:font-semibold [&_h2]:text-base [&_h2]:font-semibold [&_h3]:text-sm [&_h3]:font-semibold [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:bg-[var(--glass-surface)]"
                        dangerouslySetInnerHTML={{
                          __html: renderPreview || "<p>Start writing to see a preview.</p>",
                        }}
                      />
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[var(--foreground)]/70">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.discoveryCall}
                        onChange={() => handleToggle("discoveryCall")}
                        className="h-4 w-4 rounded border-[var(--glass-border)]"
                      />
                      Request a discovery call
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.nda}
                        onChange={() => handleToggle("nda")}
                        className="h-4 w-4 rounded border-[var(--glass-border)]"
                      />
                      NDA required
                    </label>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`bg-[var(--button-bg)] text-white px-6 py-3 rounded-full w-full hover:opacity-90 transition duration-300 shadow-lg font-semibold text-xs uppercase tracking-[0.22em] ${
                      isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    {isSubmitting ? "Sending..." : "Submit Brief"}
                  </motion.button>
                  {submitStatus === "success" && (
                    <p className="text-green-500 text-center text-xs sm:text-sm">
                      Message sent successfully!
                    </p>
                  )}
                  {submitStatus === "error" && (
                    <p className="text-red-500 text-center text-xs sm:text-sm">
                      {errorMessage || "Error sending message. Please try again."}
                    </p>
                  )}
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

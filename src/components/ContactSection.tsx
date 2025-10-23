import { motion } from "framer-motion";
import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { EnvelopeIcon, PhoneIcon, MapPinIcon, CheckCircleIcon } from "@heroicons/react/24/solid";

export default function ContactSection() {
  const [phone, setPhone] = useState<string | undefined>("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const servicesList = [
    "E-commerce",
    "POS Systems",
    "Static Website",
    "API & Automation",
    "Blockchain & Crypto",
    "Dynamic Website",
    "Custom Software",
    "Mobile App",
    "Graphic Design",
    "Consultation",
  ];
  const handleServiceChange = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
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
        setFormData({ name: "", email: "", message: "" });
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
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
      id="contact"
      className="py-8 sm:py-12 lg:py-16 mt-16 sm:mt-20 scroll-mt-[80px]"
    >
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8 lg:mb-12">Let’s Connect and Innovate Together</h2>
      <p className="text-center mb-6 sm:mb-8 lg:mb-12 text-sm sm:text-base lg:text-lg">
        Reach out to discuss how we can transform your business with our expertise.
      </p>
      <div className="max-w-4xl mx-auto bg-[var(--card-bg)] p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 lg:mb-6">Contact Information</h3>
            <div className="space-y-2 sm:space-y-3 lg:space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center"
              >
                <EnvelopeIcon className="h-5 w-5 sm:h-6 sm:w-6 text-[var(--button-bg)] mr-2 sm:mr-3" />
                <a
                  href="mailto:info@vickinstech.com"
                  className="hover:text-[var(--button-bg)] transition duration-300 text-sm sm:text-base"
                >
                  info@vickinstechnologies.com
                </a>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center"
              >
                <PhoneIcon className="h-5 w-5 sm:h-6 sm:w-6 text-[var(--button-bg)] mr-2 sm:mr-3" />
                <a
                  href="tel:+254123456789"
                  className="hover:text-[var(--button-bg)] transition duration-300 text-sm sm:text-base"
                >
                  +254 794 501 005
                </a>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-center"
              >
                <MapPinIcon className="h-5 w-5 sm:h-6 sm:w-6 text-[var(--button-bg)] mr-2 sm:mr-3" />
                <span className="text-sm sm:text-base">Ruiru, Kenya</span>
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 lg:mb-6">Send Us a Message</h3>
            <form className="space-y-3 sm:space-y-4" onSubmit={handleContactSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                className="w-full p-2 sm:p-3 rounded-lg border border-[var(--navbar-text)]/20 bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)] transition duration-300 text-sm sm:text-base"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your Email"
                className="w-full p-2 sm:p-3 rounded-lg border border-[var(--navbar-text)]/20 bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)] transition duration-300 text-sm sm:text-base"
                required
              />
              <PhoneInput
                placeholder="Your Phone Number"
                value={phone}
                onChange={setPhone}
                defaultCountry="KE"
                international
                countryCallingCodeEditable={false}
                className="w-full p-2 sm:p-3 rounded-lg border border-[var(--navbar-text)]/20 bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)] transition duration-300 text-sm sm:text-base"
              />
              <h4 className="text-sm sm:text-base lg:text-lg font-semibold mb-2">Interested Services</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2 max-h-24 sm:max-h-32 lg:max-h-40 overflow-y-auto pr-2">
                {servicesList.map((service, index) => (
                  <div key={service} className="flex items-center">
                    <input
                      id={`service-${index}`}
                      type="checkbox"
                      value={service}
                      checked={selectedServices.includes(service)}
                      onChange={() => handleServiceChange(service)}
                      className="hidden"
                    />
                    <label
                      htmlFor={`service-${index}`}
                      className="flex items-center cursor-pointer select-none text-xs sm:text-sm w-full p-1 sm:p-2 rounded-lg hover:bg-[var(--card-bg)]/50 transition-all duration-200"
                    >
                      <span
                        className={`w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 border-2 rounded flex items-center justify-center transition-all duration-200 ${
                          selectedServices.includes(service)
                            ? "bg-[var(--button-bg)] border-[var(--button-bg)]"
                            : "border-[var(--navbar-text)]/40"
                        }`}
                      >
                        <CheckCircleIcon
                          className={`h-3 w-3 sm:h-4 sm:w-4 ${
                            selectedServices.includes(service) ? "text-white" : "text-[var(--navbar-text)]/40"
                          } transition-all duration-200`}
                        />
                      </span>
                      <span className="text-[var(--navbar-text)]">{service}</span>
                    </label>
                  </div>
                ))}
              </div>
              <p className="text-xs sm:text-sm text-[var(--navbar-text)]">
                Selected Services: {selectedServices.length > 0 ? selectedServices.join(", ") : "None"}
              </p>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your Message"
                className="w-full p-2 sm:p-3 rounded-lg border border-[var(--navbar-text)]/20 bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)] h-20 sm:h-24 lg:h-32 resize-none transition duration-300 text-sm sm:text-base"
                required
              />
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`bg-[var(--button-bg)] text-[var(--navbar-text)] px-4 py-2 sm:px-6 sm:py-3 rounded-full w-full hover:opacity-90 transition duration-300 shadow-md font-semibold text-sm sm:text-base ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </motion.button>
              {submitStatus === "success" && (
                <p className="text-green-500 text-center text-xs sm:text-sm">Message sent successfully!</p>
              )}
              {submitStatus === "error" && (
                <p className="text-red-500 text-center text-xs sm:text-sm">{errorMessage || "Error sending message. Please try again."}</p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
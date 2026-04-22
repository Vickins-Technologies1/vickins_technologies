import { FC } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaXTwitter,
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaGithub,
  FaWhatsapp,
} from "react-icons/fa6";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const Footer: FC = () => {
  return (
    <footer className="mt-20">
      <div className="relative w-full overflow-hidden border-t border-white/30 bg-gradient-to-br from-white/70 via-white/40 to-white/10 backdrop-blur-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(45,212,191,0.15),_transparent_60%)]" />
        <div className="relative z-10 px-4 sm:px-6 lg:px-12 py-8 sm:py-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-[11px] uppercase tracking-[0.35em] text-[var(--foreground)]/60">
                  Vickins Technologies
                </p>
                <h3 className="text-2xl sm:text-3xl font-semibold mt-3 text-center lg:text-left">
                  Premium digital experiences for ambitious brands.
                </h3>
                <p className="text-sm text-[var(--foreground)]/75 mt-3 max-w-xl text-center lg:text-left">
                  Strategy, design, and engineering that help teams launch faster, scale reliably, and stand apart.
                </p>

                <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/50 bg-white/70 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-[var(--foreground)]/70 mx-auto lg:mx-0">
                  Based in Kenya · Working globally
                </div>

                <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-3 items-stretch sm:items-center justify-center lg:justify-start">
                  <Link
                    href="/#contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--button-bg)] px-5 py-2.5 text-xs uppercase tracking-[0.24em] font-semibold text-white shadow-lg"
                  >
                    Book a Call
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                  <a
                    href="mailto:info@vickinstechnologies.com"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/50 bg-white/70 px-5 py-2.5 text-[10px] sm:text-xs uppercase tracking-[0.24em] font-semibold text-[var(--foreground)]/70 break-all"
                  >
                    info@vickinstechnologies.com
                  </a>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-center sm:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--foreground)]/60">Navigate</p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li>
                      <Link href="/#home" className="hover:text-[var(--button-bg)] transition">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link href="/#services" className="hover:text-[var(--button-bg)] transition">
                        Services
                      </Link>
                    </li>
                    <li>
                      <Link href="/#about" className="hover:text-[var(--button-bg)] transition">
                        About
                      </Link>
                    </li>
                    <li>
                      <Link href="/portfolio" className="hover:text-[var(--button-bg)] transition">
                        Portfolio
                      </Link>
                    </li>
                    <li>
                      <Link href="/#contact" className="hover:text-[var(--button-bg)] transition">
                        Contact
                      </Link>
                    </li>
                  </ul>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--foreground)]/60">Connect</p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li>
                      <a href="tel:+254794501005" className="hover:text-[var(--button-bg)] transition">
                        +254 794 501 005
                      </a>
                    </li>
                    <li>
                      <a href="mailto:info@vickinstechnologies.com" className="hover:text-[var(--button-bg)] transition">
                        info@vickinstechnologies.com
                      </a>
                    </li>
                    <li>
                      <a href="/portfolio" className="hover:text-[var(--button-bg)] transition">
                        View Portfolio
                      </a>
                    </li>
                  </ul>

                  <div className="mt-6 flex items-center justify-center sm:justify-start gap-3 flex-wrap">
                    {[
                      { Icon: FaXTwitter, href: "https://x.com/vickins_tech" },
                      { Icon: FaWhatsapp, href: "https://wa.me/254794501005" },
                      { Icon: FaFacebook, href: "https://www.facebook.com/profile.php?id=61569016955138" },
                      { Icon: FaLinkedin, href: "https://www.linkedin.com/in/kelvinthuo" },
                      { Icon: FaInstagram, href: "https://instagram.com/vickins.technologies" },
                      { Icon: FaGithub, href: "https://github.com/vickins1" },
                    ].map(({ Icon, href }, index) => (
                      <motion.a
                        key={href}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full border border-white/40 bg-white/70 hover:bg-white transition"
                        whileHover={{ scale: 1.1, rotate: 4 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.05 * index }}
                      >
                        <Icon className="h-4 w-4" />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.div
              className="mt-10 pt-6 border-t border-white/30 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-center md:text-left"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="text-xs text-[var(--foreground)]/60">
                &copy; 2021 - {new Date().getFullYear()} Vickins Technologies. All rights reserved.
              </p>
              <div className="flex items-center justify-center md:justify-end gap-4 text-xs text-[var(--foreground)]/60 flex-wrap">
                <a href="/policy" className="hover:text-[var(--button-bg)] transition">
                  Privacy Policy
                </a>
                <a href="/terms" className="hover:text-[var(--button-bg)] transition">
                  Terms of Service
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

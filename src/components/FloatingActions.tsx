"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { ArrowUp, MessageCircle, Send, Sparkles, X } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

const quickPrompts = [
  "What services do you offer?",
  "How do you approach new projects?",
  "Do you build web platforms?",
  "Mobile app development?",
  "Brand & UI systems?",
  "How does pricing work?",
];

const serviceResponses: Array<{ keywords: string[]; response: string }> = [
  {
    keywords: ["service", "services", "offer", "what do you do", "capabilities"],
    response:
      "We help with product strategy, web platforms, mobile apps, cloud & DevOps, automation & AI, data & analytics, brand/UI systems, security, and growth enablement. Tell me your goal and I’ll suggest the right path.",
  },
  {
    keywords: ["web", "website", "web app", "platform", "portal", "ecommerce"],
    response:
      "Yes—our web platforms are built for speed, scale, and conversions. We handle discovery, UX/UI, development, QA, and launch with performance and SEO baked in.",
  },
  {
    keywords: ["mobile", "android", "ios", "app"],
    response:
      "Yes—iOS + Android apps with offline support, secure auth, and the integrations you need (payments, APIs, notifications).",
  },
  {
    keywords: ["brand", "branding", "ui", "ux", "design", "logo", "identity"],
    response:
      "We do brand identity, UI kits, and design systems so your product stays consistent across web and mobile.",
  },
  {
    keywords: ["cloud", "devops", "deployment", "hosting", "infrastructure"],
    response:
      "We set up resilient cloud infrastructure, automated deployments, and monitoring so your product scales smoothly and stays reliable.",
  },
  {
    keywords: ["automation", "ai", "assistant", "chatbot", "workflow"],
    response:
      "We build automation and AI assistants for ops, support, sales, and internal workflows—built around your business.",
  },
  {
    keywords: ["data", "analytics", "dashboard", "reporting", "insights"],
    response:
      "We build dashboards and analytics that turn usage data into actionable insights for product and business teams.",
  },
  {
    keywords: ["security", "compliance", "secure"],
    response:
      "Security is baked into every build: threat modeling, secure architecture, and compliance support where needed.",
  },
  {
    keywords: ["growth", "seo", "marketing", "performance"],
    response:
      "We optimize for growth with SEO, performance improvements, and marketing tech to help drive demand.",
  },
  {
    keywords: ["price", "pricing", "cost", "budget", "quote"],
    response:
      "Pricing depends on scope and timeline. Share what you’re building and we’ll give you a cost range and a clear plan.",
  },
  {
    keywords: ["timeline", "how long", "duration", "delivery"],
    response:
      "Timelines vary by scope—most launches range from a few weeks to a few months. We can propose a phased plan after discovery.",
  },
  {
    keywords: ["contact", "call", "meeting", "talk"],
    response:
      "Happy to connect. Use the contact section to share your needs and we’ll schedule a quick discovery call.",
  },
  {
    keywords: ["process", "approach", "how do you work", "workflow"],
    response:
      "Our process: discovery and strategy, UX/UI design, agile development, QA & launch, then support and optimization. We keep you in the loop with clear milestones.",
  },
  {
    keywords: ["support", "maintenance", "after launch"],
    response:
      "Yes—post‑launch support includes monitoring, updates, performance tuning, and ongoing feature iterations as your product grows.",
  },
  {
    keywords: ["stack", "technology", "tech", "tools"],
    response:
      "We typically use Next.js/React, TypeScript, Tailwind, cloud services, and modern CI/CD. We’ll recommend the best stack based on your product needs.",
  },
  {
    keywords: ["kenya", "remote", "location", "where"],
    response:
      "We’re based in Kenya and work with teams globally. Remote collaboration is seamless—workshops, design reviews, and delivery all online.",
  },
];

const fallbackResponse =
  "I can help with web platforms, mobile apps, branding/UI systems, automation, data, and more. Ask about a specific service or outcome and I’ll guide you.";

const greeting =
  "Hi! I’m your Vickins AI concierge. Ask about services, timelines, or how we can help your business grow.";
const serviceSnapshot =
  "Snapshot: Product strategy, web platforms, mobile apps, brand/UI systems, automation & AI, data dashboards, and growth support.";

function resolveResponse(input: string) {
  const text = input.toLowerCase();
  const match = serviceResponses.find((entry) => entry.keywords.some((word) => text.includes(word)));
  return match ? match.response : fallbackResponse;
}

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "greeting", role: "assistant", text: greeting },
    { id: "snapshot", role: "assistant", text: serviceSnapshot },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement | null>(null);
  const typingTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 360);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (typingTimer.current) {
        window.clearTimeout(typingTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isChatOpen) return;
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isChatOpen]);

  const sendMessage = useCallback((text: string) => {
    if (isTyping) return;
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMessage: Message = {
      id: `${Date.now()}-user`,
      role: "user",
      text: trimmed,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);
    typingTimer.current = window.setTimeout(() => {
      const assistantMessage: Message = {
        id: `${Date.now()}-assistant`,
        role: "assistant",
        text: resolveResponse(trimmed),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 700);
  }, [isTyping]);

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      if (isTyping) return;
      sendMessage(input);
      setInput("");
    },
    [input, isTyping, sendMessage]
  );

  const quickActions = useMemo(
    () =>
      quickPrompts.map((prompt) => (
        <button
          key={prompt}
          onClick={() => sendMessage(prompt)}
          disabled={isTyping}
          className="px-3 py-1.5 text-[10px] uppercase tracking-[0.24em] rounded-full border border-white/50 bg-white/70 text-[var(--foreground)]/80 hover:bg-white transition disabled:opacity-60"
        >
          {prompt}
        </button>
      )),
    [isTyping, sendMessage]
  );

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-[70] flex flex-col items-end gap-3">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/75 text-[var(--foreground)] shadow-[var(--shadow-tight)] backdrop-blur-xl transition-all duration-300 ${
          showTop ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none translate-y-3"
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>

      {isChatOpen && (
        <div className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 w-[92vw] max-w-[340px] sm:w-[360px] sm:max-w-[360px]">
          <div className="relative overflow-hidden rounded-3xl border border-white/40 bg-[var(--card-bg)] shadow-[var(--shadow-soft)] backdrop-blur-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.16),_transparent_60%)]" />
            <div className="relative flex items-center justify-between px-4 py-3 border-b border-white/30">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--button-bg)]/90 text-white shadow-lg">
                  <Sparkles className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.32em] text-[var(--foreground)]/60">
                    AI Concierge
                  </p>
                  <p className="text-sm font-semibold">Vickins Services</p>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="h-8 w-8 rounded-full border border-white/40 bg-white/70 text-[var(--foreground)] hover:bg-white transition"
                aria-label="Close chat"
              >
                <X className="h-4 w-4 mx-auto" />
              </button>
            </div>

            <div className="relative max-h-[42vh] sm:max-h-[46vh] overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-sm ${
                      message.role === "user"
                        ? "bg-[var(--button-bg)] text-white"
                        : "bg-white/75 text-[var(--foreground)]"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="rounded-2xl bg-white/75 px-3 py-2 shadow-sm">
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--foreground)]/60 animate-pulse" />
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--foreground)]/60 animate-pulse [animation-delay:150ms]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--foreground)]/60 animate-pulse [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            <div className="relative border-t border-white/30 px-4 py-3 space-y-3">
              <div className="flex flex-wrap gap-2">{quickActions}</div>
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about services..."
                  className="flex-1 rounded-full border border-white/40 bg-white/70 px-4 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)]/40 disabled:opacity-70"
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  className="h-10 w-10 rounded-full bg-[var(--button-bg)] text-white shadow-md hover:brightness-110 transition disabled:opacity-60"
                  aria-label="Send message"
                  disabled={isTyping || !input.trim()}
                >
                  <Send className="h-4 w-4 mx-auto" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsChatOpen((prev) => !prev)}
        aria-label="Open AI chat"
        className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-[var(--button-bg)] text-white shadow-[var(--shadow-tight)] transition hover:brightness-110"
      >
        <span className="absolute -inset-1 rounded-full bg-[var(--button-bg)]/30 blur-lg opacity-0 group-hover:opacity-100 transition" />
        <MessageCircle className="h-5 w-5 relative" />
        <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-[var(--accent)] border-2 border-white" />
      </button>
    </div>
  );
}

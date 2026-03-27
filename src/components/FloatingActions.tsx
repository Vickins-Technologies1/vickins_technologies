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
  "Do you build web platforms?",
  "Mobile app development?",
  "Brand & UI systems?",
  "How does pricing work?",
];

const serviceResponses: Array<{ keywords: string[]; response: string }> = [
  {
    keywords: ["service", "services", "offer", "what do you do", "capabilities"],
    response:
      "We help with product strategy, web platforms, mobile apps, cloud & DevOps, automation & AI, data & analytics, brand/UI systems, security, and growth enablement. Ask about any area for details.",
  },
  {
    keywords: ["web", "website", "web app", "platform", "portal", "ecommerce"],
    response:
      "Yes—our web platforms are built for speed, scale, and conversions. We handle product discovery, UX/UI, development, and launch with performance and SEO in mind.",
  },
  {
    keywords: ["mobile", "android", "ios", "app"],
    response:
      "We design and build iOS + Android apps with premium UX, offline support, and secure integrations. We can take you from prototype to production.",
  },
  {
    keywords: ["brand", "branding", "ui", "ux", "design", "logo", "identity"],
    response:
      "We craft brand identities, UI kits, and design systems that look premium and feel consistent across web and mobile experiences.",
  },
  {
    keywords: ["cloud", "devops", "deployment", "hosting", "infrastructure"],
    response:
      "We set up resilient cloud infrastructure, automated deployments, and monitoring so your product scales smoothly and stays reliable.",
  },
  {
    keywords: ["automation", "ai", "assistant", "chatbot", "workflow"],
    response:
      "We deliver automation and AI assistants that streamline operations—integrations, workflows, and smart features tailored to your business.",
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
      "Pricing depends on scope, timeline, and complexity. If you share goals and requirements, we can provide a tailored estimate.",
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
];

const fallbackResponse =
  "I can help with web platforms, mobile apps, branding/UI systems, automation, and more. Try asking about a specific service or outcome.";

const greeting =
  "Hi! I’m your Vickins AI concierge. Ask me about services, timelines, or how we can help your business.";

function resolveResponse(input: string) {
  const text = input.toLowerCase();
  const match = serviceResponses.find((entry) => entry.keywords.some((word) => text.includes(word)));
  return match ? match.response : fallbackResponse;
}

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "greeting", role: "assistant", text: greeting },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 360);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isChatOpen) return;
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isChatOpen]);

  const sendMessage = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMessage: Message = {
      id: `${Date.now()}-user`,
      role: "user",
      text: trimmed,
    };
    const assistantMessage: Message = {
      id: `${Date.now()}-assistant`,
      role: "assistant",
      text: resolveResponse(trimmed),
    };
    setMessages((prev) => [...prev, userMessage, assistantMessage]);
  }, []);

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      sendMessage(input);
      setInput("");
    },
    [input, sendMessage]
  );

  const quickActions = useMemo(
    () =>
      quickPrompts.map((prompt) => (
        <button
          key={prompt}
          onClick={() => sendMessage(prompt)}
          className="px-3 py-1.5 text-[10px] uppercase tracking-[0.24em] rounded-full border border-white/50 bg-white/70 text-[var(--foreground)]/80 hover:bg-white transition"
        >
          {prompt}
        </button>
      )),
    [sendMessage]
  );

  return (
    <div className="fixed bottom-6 right-6 z-[70] flex flex-col items-end gap-3">
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
        <div className="fixed bottom-24 right-6 w-[320px] sm:w-[360px] max-w-[88vw]">
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

            <div className="relative max-h-[46vh] overflow-y-auto px-4 py-4 space-y-3">
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
              <div ref={endRef} />
            </div>

            <div className="relative border-t border-white/30 px-4 py-3 space-y-3">
              <div className="flex flex-wrap gap-2">{quickActions}</div>
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about services..."
                  className="flex-1 rounded-full border border-white/40 bg-white/70 px-4 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)]/40"
                />
                <button
                  type="submit"
                  className="h-10 w-10 rounded-full bg-[var(--button-bg)] text-white shadow-md hover:brightness-110 transition"
                  aria-label="Send message"
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

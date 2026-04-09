"use client";

import Image from "next/image";

type AuthShellProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  brandTitle: string;
  brandSubtitle: string;
  brandPoints: string[];
  children: React.ReactNode;
};

export default function AuthShell({
  eyebrow,
  title,
  subtitle,
  brandTitle,
  brandSubtitle,
  brandPoints,
  children,
}: AuthShellProps) {
  return (
    <div className="auth-shell">
      <div className="auth-shell__bg" />
      <div className="auth-shell__grid">
        <aside className="auth-shell__brand">
          <div className="flex items-center gap-3">
            <Image src="/logo1.png" alt="Vickins Technologies" width={54} height={54} />
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-white/70">Vickins Technologies</p>
              <p className="text-lg font-semibold text-white">{brandTitle}</p>
            </div>
          </div>
          <p className="mt-6 text-2xl font-semibold text-white">{brandSubtitle}</p>
          <div className="mt-6 space-y-3">
            {brandPoints.map((point) => (
              <div key={point} className="auth-shell__bullet">
                <span className="auth-shell__bullet-dot" />
                <span className="text-sm text-white/80">{point}</span>
              </div>
            ))}
          </div>
          <div className="mt-auto pt-10 text-xs text-white/60">
            Secure access • Premium support • Nairobi
          </div>
        </aside>

        <section className="auth-shell__form">
          <div className="auth-shell__card">
            <div className="flex items-center gap-3 text-[var(--button-bg)] text-xs sm:text-sm uppercase tracking-[0.3em]">
              <Image src="/logo1.png" alt="Vickins Technologies" width={22} height={22} />
              {eyebrow}
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold mt-3 text-[var(--foreground)]">
              {title}
            </h1>
            <p className="text-sm text-[var(--muted)] mt-3">{subtitle}</p>
            <div className="mt-6">{children}</div>
          </div>
        </section>
      </div>
    </div>
  );
}

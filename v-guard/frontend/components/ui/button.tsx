import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5";

const variants: Record<Variant, string> = {
  primary: "bg-[var(--accent)] text-white shadow-[0_16px_50px_rgba(var(--accent-rgb),0.22)]",
  secondary: "border border-[var(--border)] bg-[rgba(255,255,255,0.05)] text-[var(--foreground)] hover:bg-[rgba(255,255,255,0.08)]",
  ghost: "text-[var(--foreground)]/80 hover:bg-[rgba(255,255,255,0.05)]",
};

export function Button({ className = "", variant = "primary", ...props }: ButtonProps) {
  return <button className={`${base} ${variants[variant]} ${className}`.trim()} {...props} />;
}

export function ButtonLink({ className = "", variant = "primary", ...props }: AnchorProps) {
  return <a className={`${base} ${variants[variant]} ${className}`.trim()} {...props} />;
}

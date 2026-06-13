import type { HTMLAttributes } from "react";

export function Card({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`glass panel ${className}`.trim()} {...props} />;
}

export function CardStrong({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`glass-strong panel ${className}`.trim()} {...props} />;
}

export const brandLogoAssets = {
  light: "/brand/vickins-logo-light.png",
  dark: "/brand/vickins-logo-dark.png",
} as const;

type BrandLogoProps = {
  mode?: "theme" | "light" | "dark";
  size: number;
  className?: string;
  priority?: boolean;
};

export default function BrandLogo({ mode = "theme", size, className }: BrandLogoProps) {
  const backgroundImage = mode === "theme" ? undefined : `url("${brandLogoAssets[mode]}")`;
  return (
    <span
      role="img"
      aria-label="Vickins Technologies"
      className={["brand-logo", mode === "theme" ? "brand-logo--theme" : "", className].filter(Boolean).join(" ")}
      style={{ width: size, height: size, backgroundImage }}
    />
  );
}

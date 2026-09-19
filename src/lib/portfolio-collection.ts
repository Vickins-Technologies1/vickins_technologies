export type GraphicSubProject = {
  id?: string;
  subTitle: string;
  subImage: string;
};

export type GraphicCollection = {
  id: number;
  title: string;
  category: string;
  description: string;
  mainImage: string;
  tags: string[];
  link: string;
  subProjects: GraphicSubProject[];
};

export type DevProject = {
  id?: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
};

export const diraOsProduct = {
  id: "dira-os",
  title: "Dira OS",
  category: "VICKINS PRODUCT · FLAGSHIP",
  description:
    "An offline-first business operating system combining POS, inventory, finance, reporting, teams and branch operations into one connected platform.",
  image: "/products/dira-os-logo.png",
  tags: ["Mobile", "Business OS", "Offline-first", "Vickins Product"],
  link: "https://dira-os.vickinstechnologies.com/",
};

export const vornShieldProduct = {
  id: "vornshield",
  title: "VornShield",
  category: "VICKINS PRODUCT · INFRASTRUCTURE",
  description:
    "A premium proxy management platform for controlled proxy access, dynamic credentials, usage management and prepaid infrastructure billing.",
  image: "/products/v-guard-logo.png",
  tags: ["Infrastructure", "Proxy", "Platform", "Vickins Product"],
  link: "https://vornshield.vickinstechnologies.com/",
};

const legacyVGuardLink = "https://v-guard.vickinstechnologies.com/";

export const getDefaultGraphicCollection = (): GraphicCollection => ({
  id: 100,
  title: "Branding & Graphic Design Collection",
  category: "Graphic Design",
  description:
    "A curated showcase of logos, brand identities, social templates, posters, packaging concepts and visual storytelling.",
  mainImage: "/projects/vp.jpg",
  tags: ["Branding", "Logo Design", "Graphic Design", "Visual Identity"],
  link: "/portfolio",
  subProjects: [
    { subTitle: "Vickins Brand System", subImage: "/projects/teshlie-cake-main.jpg" },
    { subTitle: "Social Media Templates", subImage: "/projects/vp.jpg" },
    { subTitle: "Client Logo Suite", subImage: "/projects/APD-1.jpg" },
    { subTitle: "Event & Promo Posters", subImage: "/projects/KN-1.jpg" },
    { subTitle: "Packaging Concepts", subImage: "/projects/TSH-1.jpg" },
    { subTitle: "Visual Storytelling", subImage: "/projects/MDS-1.jpg" },
    { subTitle: "Brand Collateral Designs", subImage: "/projects/JDTGE-1.jpg" },
    { subTitle: "Digital Ad Creatives", subImage: "/projects/VICKINS-GD-1.jpg" },
    { subTitle: "Illustrative Graphics", subImage: "/projects/P-XMASS-1.jpg" },
    { subTitle: "Typography Experiments", subImage: "/projects/M-XMASS-1.jpg" },
    { subTitle: "Color Palette Studies", subImage: "/projects/CNJ-1.jpg" },
    { subTitle: "Layout & Composition", subImage: "/projects/BPPN-1.jpg" },
    { subTitle: "Iconography Sets", subImage: "/projects/J-1.jpg" },
    { subTitle: "Creative Direction Samples", subImage: "/projects/MDAJ-1.jpg" },
    { subTitle: "Brand Guidelines Excerpts", subImage: "/projects/MCR-1.jpg" },
  ],
});

export const getDefaultDevProjects = (): DevProject[] => [
  {
    ...diraOsProduct,
    category: "VICKINS PRODUCT · FLAGSHIP",
  },
  {
    ...vornShieldProduct,
  },
  {
    id: "dev-1",
    title: "Sorana Property Managers Portal",
    category: "CLIENT PROJECT · Fullstack + UI/UX",
    description:
      "Kenya's leading property management platform: tenant tracking, M-Pesa payments, invoicing, SMS notifications, property listings, and admin dashboard.",
    image: "/clients/sorana.png",
    tags: ["TypeScript", "React/Next.js", "Dashboard", "Authentication", "Fullstack"],
    link: "https://www.soranapropertymanagers.com/",
  },
  {
    id: "dev-2",
    title: "Baggit – Premium E-commerce Platform",
    category: "CLIENT PROJECT · Fullstack + E-commerce",
    description:
      "Modern e-commerce site offering premium fashion, tech essentials, discounts, free shipping, and exclusive deals with a clean, conversion-focused design.",
    image: "/Baggit.png",
    tags: ["Next.js", "React", "Tailwind", "E-commerce", "UI/UX", "Responsive"],
    link: "https://baggit-psi.vercel.app/",
  },
  {
    id: "dev-3",
    title: "Wanjahi Group – Motors, Property & Business Solutions",
    category: "CLIENT PROJECT · Fullstack + Corporate Website",
    description:
      "Professional company website for Wanjahi Group showcasing premium vehicles, property services, business solutions, client testimonials, and performance stats.",
    image: "/projects/wanjahi.png",
    tags: ["Next.js", "TypeScript", "Tailwind", "Corporate", "UI/UX", "Responsive"],
    link: "https://wanjahi.com",
  },
  {
    id: "dev-4",
    title: "Macdee Entertainment Platform",
    category: "CLIENT PROJECT · Enterprise Web App",
    description:
      "Enterprise-level web application with robust backend, user management, and custom UI components.",
    image: "/projects/k28.png",
    tags: ["JavaScript", "Fullstack", "Enterprise", "Custom UI"],
    link: "https://macdee-entertainment.vercel.app/",
  },
  {
    id: "dev-5",
    title: "Vickins Technologies Portfolio (Current)",
    category: "CLIENT PROJECT · Web & Brand Identity",
    description:
      "Modern agency portfolio with dark/light mode, smooth animations, responsive layout, and integrated branding.",
    image: "/projects/vbi.png",
    tags: ["Next.js 14", "Tailwind CSS", "Framer Motion", "UI/UX", "Branding"],
    link: "/",
  },
];

export const mergeGraphicCollection = (
  state?: Partial<GraphicCollection> | null
): GraphicCollection => {
  const defaults = getDefaultGraphicCollection();
  if (!state) return defaults;

  const fallbackSubProjects = Array.isArray(state.subProjects)
    ? state.subProjects
    : defaults.subProjects;

  return {
    ...defaults,
    ...state,
    title: state.title?.trim() || defaults.title,
    category: state.category?.trim() || defaults.category,
    description: state.description?.trim() || defaults.description,
    mainImage: state.mainImage?.trim() || defaults.mainImage,
    link: state.link?.trim() || defaults.link,
    tags: Array.isArray(state.tags) ? state.tags : defaults.tags,
    subProjects: fallbackSubProjects.map((item, index) => ({
      id: item.id ?? `graphic-${index}`,
      subTitle: item.subTitle?.trim() || `Graphic ${index + 1}`,
      subImage: item.subImage?.trim() || "",
    })),
  };
};

export const mergeDevProjects = (state?: DevProject[] | null): DevProject[] => {
  if (!Array.isArray(state)) {
    return getDefaultDevProjects();
  }

  const normalized = state.map((item, index) => ({
    id: item.id ?? `dev-${index}`,
    title: item.title?.trim() || `Untitled Project ${index + 1}`,
    category: item.category?.trim() || "Project",
    description: item.description?.trim() || "Project description coming soon.",
    image: item.image?.trim() || "",
    tags: Array.isArray(item.tags) ? item.tags : [],
    link: item.link?.trim() || "#",
  })).map((project) =>
    project.id === "v-guard" || project.link === legacyVGuardLink
      ? { ...vornShieldProduct, category: "VICKINS PRODUCT · INFRASTRUCTURE" }
      : project
  );

  const defaults = getDefaultDevProjects();
  const hasDiraOs = normalized.some((project) => project.link === diraOsProduct.link || project.id === diraOsProduct.id);
  const hasVornShield = normalized.some((project) => project.link === vornShieldProduct.link || project.id === vornShieldProduct.id);
  const missingProducts = defaults.filter((product) =>
    product.id === diraOsProduct.id ? !hasDiraOs : !hasVornShield
  );

  return [...missingProducts, ...normalized];
};

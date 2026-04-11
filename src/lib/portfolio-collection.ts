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
    id: "dev-1",
    title: "Smart Choice Rental Management SaaS",
    category: "Fullstack + UI/UX",
    description:
      "Kenya's leading property management platform: tenant tracking, M-Pesa payments, invoicing, SMS notifications, property listings, and admin dashboard.",
    image: "/projects/scr.png",
    tags: ["TypeScript", "React/Next.js", "Dashboard", "Authentication", "Fullstack"],
    link: "https://soranapropertymanagers.com",
  },
  {
    id: "dev-2",
    title: "Baggit – Premium E-commerce Platform",
    category: "Fullstack + E-commerce",
    description:
      "Modern e-commerce site offering premium fashion, tech essentials, discounts, free shipping, and exclusive deals with a clean, conversion-focused design.",
    image: "/projects/Baggit.png",
    tags: ["Next.js", "React", "Tailwind", "E-commerce", "UI/UX", "Responsive"],
    link: "https://baggit-ashy.vercel.app/",
  },
  {
    id: "dev-3",
    title: "Wanjahi Group – Motors, Property & Business Solutions",
    category: "Fullstack + Corporate Website",
    description:
      "Professional company website for Wanjahi Group showcasing premium vehicles, property services, business solutions, client testimonials, and performance stats.",
    image: "/projects/wanjahi.png",
    tags: ["Next.js", "TypeScript", "Tailwind", "Corporate", "UI/UX", "Responsive"],
    link: "https://wanjahi.com",
  },
  {
    id: "dev-4",
    title: "Macdee Entertainment Platform",
    category: "Enterprise Web App",
    description:
      "Enterprise-level web application with robust backend, user management, and custom UI components.",
    image: "/projects/k28.png",
    tags: ["JavaScript", "Fullstack", "Enterprise", "Custom UI"],
    link: "https://macdeeentertainment.com",
  },
  {
    id: "dev-5",
    title: "Vickins Technologies Portfolio (Current)",
    category: "Web & Brand Identity",
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

  return state.map((item, index) => ({
    id: item.id ?? `dev-${index}`,
    title: item.title?.trim() || `Untitled Project ${index + 1}`,
    category: item.category?.trim() || "Project",
    description: item.description?.trim() || "Project description coming soon.",
    image: item.image?.trim() || "",
    tags: Array.isArray(item.tags) ? item.tags : [],
    link: item.link?.trim() || "#",
  }));
};

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

export interface ContactService {
  label: string;
  subject: string;
  description: string;
}

export const contactServices: ContactService[] = [
  {
    label: "Web Applications & Portals",
    subject: "Web Application / Portal Development Inquiry",
    description: `I'm interested in developing a web application or portal.\n\nProject overview:\nI would like to build a platform that helps my business or customers complete specific tasks more efficiently.\n\nKey features or requirements:\n[Please describe the main features you need.]\n\nTarget users:\n[Who will use the platform?]\n\nPreferred timeline:\n[When would you like the project to begin or launch?]\n\nAdditional information:\n[Any integrations, existing systems, or special requirements.]`,
  },
  {
    label: "Website Development",
    subject: "Website Development Inquiry",
    description: `I'm interested in building or improving a website.\n\nWebsite goals:\n[What should the website help your organization achieve?]\n\nPages and functionality:\n[Describe the main pages, CMS, forms, or other features.]\n\nContent and branding:\n[Share what is ready and what support you may need.]\n\nPreferred launch date:\n[When would you like to launch?]\n\nAdditional information:\n[Existing website, integrations, or other requirements.]`,
  },
  {
    label: "Mobile App Development",
    subject: "Mobile Application Development Inquiry",
    description: `I'm interested in developing a mobile application.\n\nTarget platforms:\n[Android, iOS, or both.]\n\nApp overview:\n[Describe what the application should do.]\n\nKey features:\n[List the most important functionality.]\n\nIntegrations:\n[Payments, APIs, authentication, offline functionality, or other requirements.]\n\nPreferred timeline:\n[When would you like to begin?]`,
  },
  {
    label: "E-commerce Development",
    subject: "E-commerce Development Inquiry",
    description: `I'm interested in building or improving an e-commerce platform.\n\nProducts or services:\n[What will you sell?]\n\nPlatform requirements:\n[Online store, product management, customer accounts, or other functionality.]\n\nPayments:\n[M-Pesa, card payments, or other supported payment methods.]\n\nAdditional integrations:\n[Shipping, inventory, accounting, or marketing tools.]\n\nPreferred launch date:\n[When would you like to go live?]`,
  },
  {
    label: "Custom Software Development",
    subject: "Custom Software Development Inquiry",
    description: `I'm interested in custom software for my organization.\n\nBusiness challenge:\n[What process or problem should the software address?]\n\nUsers and workflows:\n[Who will use it, and what do they need to do?]\n\nKey features or integrations:\n[Describe the essential capabilities and connected systems.]\n\nCurrent tools or systems:\n[What do you use today?]\n\nPreferred timeline:\n[When would you like to begin?]`,
  },
  {
    label: "POS & Business Management Systems",
    subject: "POS / Business Management System Inquiry",
    description: `I'm interested in a POS or business management solution.\n\nBusiness type:\n[Retail, hospitality, distribution, or another business.]\n\nRequired features:\n[Sales, inventory, reporting, finance, staff management, or other needs.]\n\nBranches or locations:\n[Number of business locations, if applicable.]\n\nIntegrations:\n[M-Pesa, accounting, hardware, or other systems.]\n\nAdditional requirements:\n[Describe any specific workflows.]`,
  },
  {
    label: "API Development & Integrations",
    subject: "API Development / Integration Inquiry",
    description: `I'm interested in API development or integrating systems.\n\nSystems involved:\n[Which platforms, services, or APIs need to connect?]\n\nData or workflows to connect:\n[Describe what should happen between the systems.]\n\nCurrent API documentation or constraints:\n[Share what is available, if known.]\n\nSecurity or reliability needs:\n[Authentication, permissions, monitoring, or volume expectations.]\n\nPreferred timeline:\n[When would you like to begin?]`,
  },
  {
    label: "Automation & AI",
    subject: "Automation & AI Inquiry",
    description: `I'm interested in automation or an AI-enabled workflow.\n\nCurrent process:\n[Describe the task or workflow you want to improve.]\n\nDesired outcome:\n[What should become faster, easier, or more reliable?]\n\nTools and data involved:\n[Share relevant systems, documents, or data sources.]\n\nHuman review or safeguards:\n[Where should people stay involved?]\n\nAdditional requirements:\n[Timeline, integrations, or other constraints.]`,
  },
  {
    label: "Cloud, DevOps & Infrastructure",
    subject: "Cloud Infrastructure / DevOps Inquiry",
    description: `I'm interested in cloud infrastructure, DevOps, or reliability engineering services.\n\nCurrent infrastructure:\n[Describe your current hosting or deployment environment.]\n\nObjectives:\n[Scalability, reliability, automation, monitoring, cost optimization, or migration.]\n\nTechnology stack:\n[Languages, frameworks, cloud providers, and existing infrastructure.]\n\nKey challenges:\n[Describe the problems you want to solve.]`,
  },
  {
    label: "Data & Analytics",
    subject: "Data & Analytics Inquiry",
    description: `I'm interested in data, reporting, or analytics support.\n\nDecisions to support:\n[What questions should your data help answer?]\n\nData sources:\n[Where is the relevant data stored today?]\n\nReports or dashboards:\n[Describe the metrics and audiences that matter.]\n\nData quality or integration needs:\n[Share known challenges.]\n\nAdditional information:\n[Timeline, access, or other requirements.]`,
  },
  {
    label: "UI/UX & Design Systems",
    subject: "UI/UX & Design Systems Inquiry",
    description: `I'm interested in improving a product's user experience or design system.\n\nProduct or interface:\n[Describe the website, app, or internal tool.]\n\nUsers and goals:\n[Who uses it, and what should be easier?]\n\nAreas to improve:\n[Research, flows, visual design, accessibility, or component systems.]\n\nExisting materials:\n[Share any brand guidelines, designs, or research.]\n\nAdditional information:\n[Timeline or team requirements.]`,
  },
  {
    label: "Cybersecurity & Security Consulting",
    subject: "Cybersecurity / Security Consulting Inquiry",
    description: `I'm interested in security consulting or a security review.\n\nSystem or environment:\n[Describe the application, infrastructure, or process.]\n\nAreas of concern:\n[Security review, threat modeling, hardening, privacy, or incident readiness.]\n\nRequirements or standards:\n[Share any applicable requirements, if known.]\n\nScope and access constraints:\n[Describe what can be reviewed.]\n\nAdditional information:\n[Timing or other context. Please do not include passwords or secrets.]`,
  },
  {
    label: "Enterprise Solutions & System Modernization",
    subject: "Enterprise Solution / Modernization Inquiry",
    description: `I'm interested in an enterprise solution or modernizing an existing system.\n\nOrganization and objectives:\n[Describe the organization and desired outcomes.]\n\nCurrent systems:\n[What platforms or processes are involved?]\n\nModernization needs:\n[Migration, integrations, architecture, performance, or maintainability.]\n\nStakeholders and constraints:\n[Teams, approvals, security, or operational considerations.]\n\nPreferred next step:\n[What would help you evaluate the work?]`,
  },
  {
    label: "Ongoing Maintenance & Technical Support",
    subject: "Website / Application Maintenance & Support Inquiry",
    description: `I'm interested in ongoing maintenance or technical support.\n\nExisting platform:\n[Website, mobile app, API, or other system.]\n\nTechnology stack:\n[If known.]\n\nSupport requirements:\n[Bug fixes, updates, security, performance, monitoring, or new features.]\n\nCurrent challenges:\n[Describe the issues you are experiencing.]\n\nPreferred support arrangement:\n[One-time assistance or ongoing support.]`,
  },
  {
    label: "Physical Security Systems",
    subject: "Physical Security Systems Inquiry",
    description: `I'm interested in physical security systems for my premises.\n\nPremises type and location:\n[Describe the site and general location.]\n\nSystems of interest:\n[CCTV, access control, alarms, gates, intercom, or other systems.]\n\nCoverage or requirements:\n[Describe entrances, areas, monitoring, or integrations.]\n\nExisting equipment or constraints:\n[Share what is already installed, if known.]\n\nPreferred timeline:\n[When would you like an assessment or installation?]`,
  },
  {
    label: "Other / Not Sure Yet",
    subject: "Project Inquiry",
    description: `I'm exploring a project and would appreciate guidance.\n\nProject or challenge:\n[What are you hoping to achieve?]\n\nWho it is for:\n[Describe the people or organization it will support.]\n\nWhat you know so far:\n[Share any ideas, requirements, or constraints.]\n\nPreferred timeline:\n[When would you like to take the next step?]\n\nAdditional context:\n[Any questions or details that may help us understand.]`,
  },
];

export const neutralProjectTemplate = contactServices.at(-1)!;

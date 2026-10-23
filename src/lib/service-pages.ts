export type ServicePageData = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  intro: string;
  problem: string;
  deliverables: string[];
  useCases: string[];
  process: string[];
  faqs: { question: string; answer: string }[];
  related: string[];
  productUrl?: string;
  productLabel?: string;
};

export const servicePages: ServicePageData[] = [
  {
    slug: "web-development",
    title: "Web Development",
    metaTitle: "Web Development Services in Kenya",
    description: "Vickins Technologies designs and develops web applications, portals and customer platforms with attention to usability, performance and maintainable engineering.",
    intro: "Plan and build a web application, portal or customer-facing platform around the people who will use it and the work it needs to support.",
    problem: "Teams often outgrow disconnected tools, manual handoffs or a website that cannot support the next stage of their service. A focused web platform can bring key tasks and information into a more coherent workflow.",
    deliverables: ["Discovery and scope definition", "User flows and interface design", "Web applications, portals and dashboards", "Integration planning and implementation", "Quality checks, documentation and handover"],
    useCases: ["Customer and partner portals", "Operational dashboards", "Internal business applications", "Service and product websites"],
    process: ["Clarify the users, goals, constraints and existing systems.", "Agree on information structure, key flows and technical approach.", "Build and review the platform in milestones.", "Prepare launch, documentation and ongoing support options."],
    faqs: [
      { question: "Can you work with an existing website or platform?", answer: "Yes. The first step is to review the current platform, its constraints and the changes needed before recommending an approach." },
      { question: "Can a web application connect to our existing systems?", answer: "Integration scope depends on the systems and access available. We assess the interfaces and data flows during discovery." },
    ],
    related: ["custom-software-development", "mobile-app-development"],
  },
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    metaTitle: "Custom Software Development in Kenya",
    description: "Vickins Technologies plans and builds custom business software, platforms and integrations around existing workflows and operational requirements.",
    intro: "Build software around the way your organization needs to work, with clear scope, documented architecture and a handover your team can maintain.",
    problem: "Off-the-shelf products may not fit a particular workflow, data model or integration requirement. Custom software can connect those requirements in a system designed for the organization using it.",
    deliverables: ["Requirements and workflow discovery", "Architecture and data modelling", "Custom web or mobile business systems", "Role-based access and integrations where required", "Testing, documentation and handover"],
    useCases: ["Replacing spreadsheet-heavy workflows", "Connecting business systems", "Building internal tools for specific processes", "Modernizing an existing application"],
    process: ["Map users, workflows, existing data and constraints.", "Define a practical first release and architecture.", "Implement in reviewable milestones and validate against agreed needs.", "Prepare deployment, documentation and operational handover."],
    faqs: [
      { question: "How does a custom software project begin?", answer: "It begins with discovery: understanding the workflow, users, systems, constraints and what a useful first release must do." },
      { question: "Can you modernize software we already use?", answer: "Existing systems can be assessed for targeted improvements, integrations or a phased modernization plan." },
    ],
    related: ["web-development", "business-automation", "mobile-app-development"],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    metaTitle: "Mobile App Development in Kenya",
    description: "Vickins Technologies builds iOS and Android mobile applications with considered user flows, integrations and maintainable engineering.",
    intro: "Design and develop a mobile product around the tasks people need to complete on the move, and the services or systems it needs to connect with.",
    problem: "A mobile experience can make a service more accessible to its users, but it must fit real device, connectivity and operational needs rather than simply mirror a desktop interface.",
    deliverables: ["Mobile product discovery and user flows", "iOS and Android application development", "Backend and API integration planning", "Authentication and payment flows where required", "Release preparation, testing and documentation"],
    useCases: ["Customer-facing mobile services", "Field and team workflows", "Mobile access to business systems", "Offline workflows where the requirements support them"],
    process: ["Define the audience, devices, workflows and integration needs.", "Prototype key flows and agree on the initial scope.", "Build, test and review the application in milestones.", "Prepare release and support based on the agreed platforms."],
    faqs: [
      { question: "Do you develop for both Android and iOS?", answer: "The target platforms are agreed during discovery based on the intended audience, requirements and delivery approach." },
      { question: "Can a mobile app work with an existing business system?", answer: "It can where the system provides an appropriate integration path. This is assessed during technical discovery." },
    ],
    related: ["custom-software-development", "web-development"],
  },
  {
    slug: "business-automation",
    title: "Business Automation",
    metaTitle: "Business Automation Services in Kenya",
    description: "Vickins Technologies helps teams map and automate operational, support, sales and internal workflows, with integrations and AI considered where appropriate.",
    intro: "Reduce repetitive handoffs by mapping the workflow first, then selecting appropriate automation and integration steps around the tools your team already uses.",
    problem: "Repeated manual updates, approvals and information transfers can make routine work harder to track. Automation can coordinate suitable steps while keeping people involved where judgment is needed.",
    deliverables: ["Workflow mapping and automation opportunities", "Integration design for available systems", "Automated notifications and task flows", "AI enablement where appropriate to the task", "Monitoring, documentation and review"],
    useCases: ["Internal approvals and handoffs", "Operations and support workflows", "Sales process coordination", "Data movement between connected systems"],
    process: ["Document the current workflow and its exceptions.", "Identify suitable automation points and human review needs.", "Implement a scoped workflow and test it with real scenarios.", "Document ownership and review the flow after launch."],
    faqs: [
      { question: "Does every workflow need AI?", answer: "No. Many workflows are better served by straightforward rules and integrations. The approach should fit the task and its risks." },
      { question: "Can automation connect our existing tools?", answer: "That depends on the systems' available APIs, permissions and data formats, which are checked during discovery." },
    ],
    related: ["custom-software-development", "web-development"],
  },
  {
    slug: "pos-solutions",
    title: "Point-of-Sale Solutions",
    metaTitle: "POS and Business Management Software",
    description: "Explore Dira OS, Vickins Technologies' Android business platform with point-of-sale, inventory and offline-first workflows for day-to-day operations.",
    intro: "Dira OS brings point-of-sale, inventory and business operations workflows into an Android application for businesses that need a connected way to manage day-to-day activity.",
    problem: "Sales, stock and operating information can be difficult to reconcile when each task is handled in a separate place. A POS and business management platform can connect these workflows within one product.",
    deliverables: ["Point-of-sale workflows", "Inventory and stock management", "Sales and expense tracking", "Business reporting", "Offline-first work continuity"],
    useCases: ["Retail and service businesses managing daily sales", "Teams tracking stock alongside transactions", "Businesses that need to continue work when connectivity is unreliable"],
    process: ["Review the business workflow and operating requirements.", "Explore the Dira OS product and confirm fit for the business.", "Plan setup and team onboarding around the available product features.", "Use the product's official site for current access and support information."],
    faqs: [
      { question: "What is Dira OS?", answer: "Dira OS is an Android business management application that includes POS, inventory, finance, reporting, team and branch workflows, and offline-first operation." },
      { question: "Where can I learn about Dira OS access and pricing?", answer: "Visit the official Dira OS website for current product information and available access options." },
    ],
    related: ["custom-software-development", "business-automation"],
    productUrl: "https://dira-os.vickinstechnologies.com/",
    productLabel: "Visit the official Dira OS website",
  },
];

export const servicePageBySlug = Object.fromEntries(servicePages.map((page) => [page.slug, page])) as Record<string, ServicePageData>;

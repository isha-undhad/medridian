export interface PolicySection {
  id: string;
  title: string;
  badge?: string;
  content: string[];
  bulletPoints?: string[];
}

export interface PrivacyPolicyData {
  title: string;
  subtitle: string;
  version: string;
  lastUpdated: string;
  effectiveDate: string;
  summaryHighlights: {
    icon: string;
    title: string;
    description: string;
  }[];
  sections: PolicySection[];
}

export const privacyPolicyData: PrivacyPolicyData = {
  title: "Privacy Policy & Client Data Agreement",
  subtitle: "Transparency, security, and the protection of your personal memories and data are at the core of our studio values.",
  version: "2.4",
  lastUpdated: "February 24, 2026",
  effectiveDate: "January 1, 2026",
  summaryHighlights: [
    {
      icon: "ShieldCheck",
      title: "Zero Data Selling",
      description: "We never sell, lease, or monetize your personal information or photographs to third parties.",
    },
    {
      icon: "Lock",
      title: "Encrypted Client Galleries",
      description: "Private online proofing galleries and high-resolution deliverables are password-protected and encrypted.",
    },
    {
      icon: "UserCheck",
      title: "Full Client Control",
      description: "You have full authority to access, download, amend, or request deletion of your stored records at any time.",
    },
  ],
  sections: [
    {
      id: "collection",
      title: "1. Information We Collect",
      badge: "Collection",
      content: [
        "Dream Stories collects information necessary to deliver bespoke photography, videography, and creative consultation services.",
        "We collect personal and event data through our website inquiry forms, direct email/phone communications, and client questionnaires, including:",
      ],
      bulletPoints: [
        "Full names, email addresses, phone numbers, and billing addresses.",
        "Wedding, engagement, or session dates, venue coordinates, and event itineraries.",
        "Aesthetic preferences, family details, and special photography requests.",
        "Technical data (IP addresses, browser type, device information, and interaction logs) gathered anonymously via standard cookies to optimize site performance.",
      ],
    },
    {
      id: "usage",
      title: "2. How We Use Your Information",
      badge: "Processing",
      content: [
        "Your information is utilized solely for legitimate business operations and fulfilling agreed creative services, including:",
      ],
      bulletPoints: [
        "Preparing personalized investment guides, proposals, and bespoke service agreements.",
        "Coordinating event logistics, timeline consultations, and on-site photography coverage.",
        "Processing invoices, payments, and retainer deposits securely via our PCI-compliant payment gateways.",
        "Delivering private digital proofs, heirloom print orders, and digital download galleries.",
        "Sending occasional studio newsletters and seasonal booking openings (which you can unsubscribe from with a single click at any time).",
      ],
    },
    {
      id: "galleries",
      title: "3. Client Galleries & Image Privacy Rights",
      badge: "Image Protection",
      content: [
        "We understand the intimate nature of wedding and family photography. We uphold stringent confidentiality regarding your imagery:",
      ],
      bulletPoints: [
        "Private Proofing Galleries: Your private gallery is hosted on an encrypted, access-restricted cloud infrastructure protected by unique client pins or passwords.",
        "Portfolio & Social Media Showcase: We only share client imagery in our public portfolio, blog, or editorial features with your explicit consent as outlined in your bespoke photography contract.",
        "Guest Access Control: You retain complete discretion over who you share your private gallery links and download permissions with.",
      ],
    },
    {
      id: "cookies",
      title: "4. Cookies & Web Analytics",
      badge: "Preferences",
      content: [
        "Our website utilizes standard, non-intrusive cookies to ensure smooth navigation, preserve user preferences (such as your policy acceptance state), and measure aggregate traffic patterns.",
        "You may adjust your browser settings to decline cookies at any time; however, some interactive features of our website may experience reduced performance.",
      ],
    },
    {
      id: "security",
      title: "5. Data Security & Storage Practices",
      badge: "Security",
      content: [
        "We enforce industry-standard physical, procedural, and technological safeguards to defend your personal records against unauthorized access, loss, or misuse.",
        "All communications and data transmissions across this website are secured with modern 256-bit SSL/TLS encryption. Raw image files and client records are backed up across dual redundant secure archives.",
      ],
    },
    {
      id: "third-parties",
      title: "6. Third-Party Service Providers",
      badge: "Partners",
      content: [
        "We partner exclusively with reputable, security-verified vendors strictly to facilitate studio services:",
      ],
      bulletPoints: [
        "Cloud gallery hosting and digital asset management providers.",
        "PCI-DSS compliant payment gateways (e.g., Stripe, HoneyBook).",
        "Fine-art printing labs and heirloom album binding artisans for print fulfillment.",
        "Transactional email and studio scheduling systems.",
      ],
    },
    {
      id: "rights",
      title: "7. Your Rights & Privacy Choices",
      badge: "Your Control",
      content: [
        "In accordance with modern privacy standards (including GDPR and CCPA), you have the absolute right to:",
      ],
      bulletPoints: [
        "Request an export of all personal data and session records we hold concerning you.",
        "Request corrections or updates to any inaccurate contact information.",
        "Request the permanent deletion of your contact records from our inquiry archives.",
        "Withdraw marketing consent at any time without affecting your client services.",
      ],
    },
    {
      id: "contact",
      title: "8. Studio Inquiries & Contact Details",
      badge: "Support",
      content: [
        "If you have any questions, suggestions, or requests regarding this Privacy Policy or how your personal information is handled, please reach out to our studio directly:",
      ],
      bulletPoints: [
        "Studio Email: Hi.tdswedding@gmail.com",
        "Direct Phone: +91 98989 26919",
        "Location: Surat, India — Available Worldwide",
      ],
    },
  ],
};

export type NavLink = {
  label: string;
  href: string;
};

/** Left cluster of the header, and the top of the mobile overlay menu. */
export const headerPrimaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Services", href: "/services" },
];

/** Right-side utility links in the header, before the Inquire CTA. */
export const headerUtilityNav: NavLink[] = [
  { label: "Experience", href: "/experience" },
  { label: "Blog", href: "/blog" },
];

/** Combined list for the mobile overlay menu. */
export const mobileNavLinks: NavLink[] = [...headerPrimaryNav, ...headerUtilityNav];

export const inquireLink: NavLink = { label: "Inquire", href: "/contact" };

export const brand = {
  name: "Meridian Studio",
  short: "Meridian",
  tagline:
    "Meridian is a San Francisco-based destination wedding photography studio documenting celebrations filled with romance and grandeur, at home and around the world.",
  email: "hello@meridianstudio.com",
  phone: "+1 (415) 555-0142",
  location: "San Francisco, CA — available worldwide",
};

export type SocialIcon = "facebook" | "instagram" | "pinterest";

export const socialLinks: { label: string; icon: SocialIcon; href: string }[] = [
  { label: "Facebook", icon: "facebook", href: "https://facebook.com" },
  { label: "Instagram", icon: "instagram", href: "https://instagram.com" },
  { label: "Pinterest", icon: "pinterest", href: "https://pinterest.com" },
];

/** Footer "Explore" column — two stacked sub-columns of links. */
export const footerExploreColumnA: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export const footerExploreColumnB: NavLink[] = [
  { label: "Education", href: "#" },
  { label: "Blog", href: "/blog" },
  { label: "Press", href: "#" },
  { label: "Testimonials", href: "#" },
];

/** Footer "Galleries" column — links directly to portfolio category tabs with anchor scroll. */
export const footerGalleries: NavLink[] = [
  { label: "Weddings", href: "/portfolio?category=Weddings#portfolio-browser" },
  { label: "Engagements", href: "/portfolio?category=Engagements#portfolio-browser" },
  { label: "Family & Maternity", href: "/portfolio?category=Family%20%26%20Maternity#portfolio-browser" },
];

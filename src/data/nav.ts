export type NavLink = {
  label: string;
  href: string;
};

/** Left cluster of the header, and the top of the mobile overlay menu. */
export const headerPrimaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  // { label: "Services", href: "/services" }, // Disabled as part of Phase 1 redesign
];

/** Right-side utility links in the header, before the Inquire CTA. */
export const headerUtilityNav: NavLink[] = [
  // { label: "Experience", href: "/experience" }, // Disabled as part of Phase 1 redesign
  // { label: "Blog", href: "/blog" }, // Disabled as part of Phase 1 redesign
];

/** Combined list for the mobile overlay menu. */
export const mobileNavLinks: NavLink[] = [...headerPrimaryNav, ...headerUtilityNav];

export const inquireLink: NavLink = { label: "Inquire", href: "/contact" };

export const brand = {
  name: "Dream Stories",
  short: "Dream Stories",
  tagline:
    "Dream Stories is a Surat, India-based destination wedding photography studio documenting celebrations filled with romance and grandeur, at home and around the world.",
  email: "Hi.tdswedding@gmail.com",
  phone: "+91 98989 26919",
  location: "Surat, India — available worldwide",
};

export type SocialIcon = "instagram" | "pinterest" | "youtube";

export const socialLinks: { label: string; icon: SocialIcon; href: string }[] = [
  { label: "Instagram", icon: "instagram", href: "https://www.instagram.com/the_dream_stories_" },
  { label: "Pinterest", icon: "pinterest", href: "https://pin.it/7oNJJiO0F" },
  { label: "YouTube", icon: "youtube", href: "https://youtube.com/@thedreamstoriesproduction?si=p1LyWN0yrG1T7p9t" },
];

/** Footer "Explore" column — two stacked sub-columns of links. */
export const footerExploreColumnA: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  // { label: "Services", href: "/services" }, // Disabled as part of Phase 1 redesign
  { label: "Contact", href: "/contact" },
];

export const footerExploreColumnB: NavLink[] = [
  { label: "Education", href: "#" },
  // { label: "Blog", href: "/blog" }, // Disabled as part of Phase 1 redesign
  { label: "Press", href: "#" },
  { label: "Testimonials", href: "#" },
];

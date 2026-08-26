import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type NavLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    children: ReactNode;
    active?: boolean;
    className?: string;
  };

/** A link with a thin underline that grows from the center on hover
 * (`after:` pseudo-element, scale-x transform). `active` pins the underline
 * visible without needing hover — used for the current-page indicator. */
export function NavLink({ children, active = false, className = "", ...rest }: NavLinkProps) {
  return (
    <Link
      className={`relative inline-block w-fit py-1 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-center after:bg-current after:transition-transform after:duration-300 after:content-[''] ${
        active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
      } ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}

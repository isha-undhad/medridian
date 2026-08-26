import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/**
 * Shared layout container that establishes the site-wide maximum width and
 * horizontal padding. Matches the Navbar's horizontal boundaries exactly
 * (starting at the logo's left edge and ending at the last nav link's right edge).
 */
export default function Container({
  as: Tag = "div",
  className,
  children,
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full max-w-7xl px-6 sm:px-10", className)}>
      {children}
    </Tag>
  );
}

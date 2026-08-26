import { ReactNode } from "react";

type HeadingProps = {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
};

export default function Heading({
  children,
  className = "",
  as: Component = "h1",
}: HeadingProps) {
  return (
    <Component
      className={`text-heading text-balance ${className}`}
    >
      {children}
    </Component>
  );
}

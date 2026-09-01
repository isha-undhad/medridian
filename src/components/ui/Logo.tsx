import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "mark" | "full";
  tone?: "light" | "dark";
  className?: string;
  priority?: boolean;
};

/** Circular monogram badge with tightly cropped logo image centered inside */
export function MonogramBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={cn(
        "flex items-center justify-center rounded-full border border-current p-2 overflow-hidden",
        className
      )}
    >
      <Image
        src="/logo-dark-cropped.png"
        alt="Dream Stories"
        width={112}
        height={61}
        style={{ objectFit: "contain" }}
        className="h-full w-full object-contain"
      />
    </span>
  );
}

/** The "DREAM STORIES" wordmark typography fallback */
export function LogoWordmark({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`font-serif tracking-wide ${className}`}>{children}</span>;
}

export function Logo({
  variant = "full",
  tone = "dark",
  className = "",
  priority = true,
}: LogoProps) {
  if (variant === "mark") {
    return <MonogramBadge className={className} />;
  }

  const src = tone === "light" ? "/logo.PNG" : "/logo-dark.png";

  return (
    <Image
      src={src}
      alt="Dream Stories"
      width={180}
      height={70}
      style={{ objectFit: "contain" }}
      priority={priority}
      className={cn("h-10 sm:h-12 w-auto object-contain transition-all duration-300", className)}
    />
  );
}

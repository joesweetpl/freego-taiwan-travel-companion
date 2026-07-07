import { ArrowRight } from "lucide-react";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "light";
  full?: boolean;
};

export function Button({
  children,
  variant = "primary",
  full = false,
  className = "",
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-freego-orange text-freego-ink shadow-[0_12px_28px_rgba(242,140,56,0.24)] hover:bg-[#e77b24]",
    secondary:
      "border border-freego-teal/25 bg-white/70 text-freego-teal hover:border-freego-orange hover:text-freego-orange",
    light:
      "border border-white/25 bg-white text-freego-teal hover:bg-freego-ivory"
  };

  return (
    <a
      className={`group inline-flex min-h-12 items-center justify-center gap-2 rounded-freego px-5 py-3 text-center text-sm font-bold transition duration-200 hover:-translate-y-0.5 hover:shadow-lift ${
        variants[variant]
      } ${
        full ? "w-full" : "w-full sm:w-auto"
      } ${className}`}
      {...props}
    >
      <span>{children}</span>
      <ArrowRight
        aria-hidden="true"
        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
      />
    </a>
  );
}

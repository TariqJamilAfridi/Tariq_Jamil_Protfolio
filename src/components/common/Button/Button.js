/**
 * Button — unified CTA component with two variants:
 *   • "primary"  → solid blue fill (Hire Me, Send Message, etc.)
 *   • "ghost"    → transparent with blue border (Download Resume, Live Demo, etc.)
 *
 * Usage:
 *   <Button variant="primary">Hire Me</Button>
 *   <Button variant="ghost" as="a" href={CV} download>Download Resume</Button>
 */
function Button({
  children,
  className = "",
  variant = "primary",
  size = "md",
  as: Component = "button",
  ...props
}) {
  // ── Base styles shared across all variants ──────────────────────────────────
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-lg " +
    "transition-all duration-300 cursor-pointer select-none focus-visible:outline-none " +
    "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 " +
    "focus-visible:ring-offset-slate-900 active:scale-95";

  // ── Variant styles ──────────────────────────────────────────────────────────
  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-500 " +
      "shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40 hover:-translate-y-0.5",
    ghost:
      "border border-blue-500 text-blue-400 bg-transparent " +
      "hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:-translate-y-0.5 " +
      "hover:shadow-lg hover:shadow-blue-500/30",
    // Utility variant used for icon-only or minimalist cases
    subtle:
      "text-gray-400 hover:text-white hover:bg-slate-800 border border-transparent " +
      "hover:border-slate-700",
  };

  // ── Size styles ─────────────────────────────────────────────────────────────
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const resolvedVariant = variants[variant] ?? variants.primary;
  const resolvedSize = sizes[size] ?? sizes.md;

  return (
    <Component
      className={`${base} ${resolvedVariant} ${resolvedSize} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Button;

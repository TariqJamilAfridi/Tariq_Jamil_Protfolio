/**
 * Button — variant system with full light + dark mode support.
 *   primary → solid blue (Hire Me, Send Message)
 *   ghost   → bordered blue (Download Resume, Live Demo)
 *   subtle  → muted/minimalist
 */
function Button({
  children,
  className = "",
  variant = "primary",
  size = "md",
  as: Component = "button",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-lg " +
    "transition-all duration-300 cursor-pointer select-none focus-visible:outline-none " +
    "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 " +
    "focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 active:scale-95";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-500 " +
      "shadow-md shadow-blue-600/20 hover:shadow-blue-500/35 hover:-translate-y-0.5",
    ghost:
      "border border-blue-500 dark:border-blue-500 " +
      "text-blue-600 dark:text-blue-400 bg-transparent " +
      "hover:bg-blue-600 hover:text-white hover:border-blue-600 " +
      "hover:-translate-y-0.5 hover:shadow-md hover:shadow-blue-500/25",
    subtle:
      "text-slate-500 dark:text-slate-400 " +
      "hover:text-slate-900 dark:hover:text-white " +
      "hover:bg-slate-100 dark:hover:bg-slate-800 " +
      "border border-transparent hover:border-slate-200 dark:hover:border-slate-700",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-sm",
  };

  return (
    <Component
      className={`${base} ${variants[variant] ?? variants.primary} ${sizes[size] ?? sizes.md} ${className}`}
      {...props}>
      {children}
    </Component>
  );
}

export default Button;

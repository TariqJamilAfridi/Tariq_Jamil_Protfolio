function Button({ children, className = "", as: Component = "button", ...props }) {
  return (
    <Component
      className={`inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Button;

const variantStyles = {
  primary:
    "bg-cyan-500 text-slate-950 hover:bg-cyan-400 focus-visible:ring-cyan-400 shadow-lgshadow-cyan-500/20" ,

  secondary:
    "border border-slate-700 bg-slate-900 text-white hover:bg-slate-800 focus-visible:ring-slate-500",

 ghost:
    "bg-transparent text-slate-400 hover:bg-slate-800 hover:text-cyan-400"
};

function Button({
  children,
  variant = "primary",
  type = "button",
  className = "",
  disabled = false,
  ...props
}) {
  const selectedVariant = variantStyles[variant] ?? variantStyles.primary;

  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center
        rounded-lg px-5 py-2.5
        text-sm font-semibold
        transition duration-200
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-offset-2
        focus-visible:ring-offset-slate-950
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${selectedVariant}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
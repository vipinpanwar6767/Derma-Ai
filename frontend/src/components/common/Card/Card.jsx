const variantStyles = {
  default:
    "border-slate-800 bg-slate-900/70",

  elevated:
    "border-slate-800 bg-slate-900 shadow-xl shadow-black/20",

  glass:
    "border-white/10 bg-white/5 backdrop-blur-xl",

  interactive:
    "border-slate-800 bg-slate-900/70 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/10",
};

function Card({
  children,
  variant = "default",
  className = "",
  padding = true,
  ...props
}) {
  const selectedVariant =
    variantStyles[variant] ?? variantStyles.default;

  return (
    <div
      className={`
        rounded-2xl
        border
        transition duration-200
        ${padding ? "p-6" : ""}
        ${selectedVariant}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
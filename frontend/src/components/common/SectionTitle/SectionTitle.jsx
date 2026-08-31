function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}) {
  const alignmentStyles = {
    left: "items-start text-left",
    center: "items-center text-center",
  };

  const selectedAlignment =
    alignmentStyles[align] ?? alignmentStyles.left;

  return (
    <div
      className={`
        flex max-w-3xl flex-col gap-3
        ${selectedAlignment}
        ${className}
      `}
    >
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
          {eyebrow}
        </p>
      )}

      <h2
        style={{ fontFamily: "Poppins, sans-serif" }}
        className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
      >
        {title}
      </h2>

      {description && (
        <p className="text-base leading-7 text-slate-400 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionTitle;
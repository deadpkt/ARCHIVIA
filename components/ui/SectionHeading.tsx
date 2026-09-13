export function SectionHeading({
  label,
  title,
}: {
  label: string;
  title: string;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr",
        gap: 24,
        marginBottom: 40,
      }}
    >
      <p className="eyebrow">{label}</p>
      <h2
        className="display"
        style={{ fontSize: "clamp(34px,5vw,68px)", margin: 0, lineHeight: 1 }}
      >
        {title}
      </h2>
    </div>
  );
}

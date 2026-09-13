const areas = [
  "3D Architecture",
  "AI Visualization",
  "Material Studies",
  "Photorealistic Renders",
  "Real-estate Visualization",
];
export default function About() {
  return (
    <main className="wrap" style={{ paddingTop: 160, paddingBottom: 100 }}>
      <p className="eyebrow">About Archivia</p>
      <h1
        className="display"
        style={{
          fontSize: "clamp(48px,8vw,108px)",
          lineHeight: 0.94,
          maxWidth: 1100,
          margin: "32px 0 100px",
        }}
      >
        Architecture, seen through <i>new material and light.</i>
      </h1>
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 40,
          borderTop: "1px solid var(--line)",
          paddingTop: 28,
        }}
      >
        <p className="eyebrow">Our point of view</p>
        <div>
          <p
            style={{
              fontSize: "clamp(21px,2.5vw,34px)",
              lineHeight: 1.35,
              marginTop: 0,
            }}
          >
            ARCHIVIA explores how architectural 3D, material studies and AI
            visualization can communicate architectural ideas.
          </p>
          <p style={{ color: "var(--muted)", lineHeight: 1.7, maxWidth: 530 }}>
            A visual practice shaped around composition, material, lighting and
            market-ready architectural storytelling.
          </p>
        </div>
      </section>
      <section style={{ marginTop: 130 }}>
        {areas.map((a, i) => (
          <div
            key={a}
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderTop: "1px solid var(--line)",
              padding: "22px 0",
            }}
          >
            <span className="eyebrow">0{i + 1}</span>
            <h2
              className="display"
              style={{ fontSize: "clamp(32px,5vw,62px)", margin: 0 }}
            >
              {a}
            </h2>
          </div>
        ))}
      </section>
      <style>{`@media(max-width:700px){section{grid-template-columns:1fr!important}}`}</style>
    </main>
  );
}

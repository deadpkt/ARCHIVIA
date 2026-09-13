const disciplines = ["3D Architecture", "Material Studies", "AI Visualization", "Photorealistic Renders"];

export default function About() {
  return (
    <main className="about-page wrap">
      <p className="eyebrow">About / Archivia</p>
      <h1>ARCHIVIA IS A VISUAL<br />EXPLORATION OF<br /><i>ARCHITECTURE.</i></h1>
      <section className="about-intro editorial-rule">
        <p className="eyebrow">Point of view</p>
        <div><p>Architecture becomes tangible through spatial clarity, material attention and a precise image-making process.</p><p className="about-muted">ARCHIVIA is an independent visualization study connecting real-time architectural environments with AI-assisted imagery and photorealistic render direction.</p></div>
      </section>
      <section className="discipline-list">
        {disciplines.map((discipline, index) => <div key={discipline}><span>0{index + 1}</span><h2>{discipline}</h2></div>)}
      </section>
    </main>
  );
}

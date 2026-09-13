import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { ClientArchitectureViewer } from "@/components/3d/ClientArchitectureViewer";

const process = [
  ["01", "3D Architecture", "A spatial framework with real proportion, light and point of view."],
  ["02", "Material Study", "Surface, texture and reflection are resolved as part of the architecture."],
  ["03", "AI Visualization", "A controlled visual layer extends the design intent without losing it."],
  ["04", "Photorealistic Render", "A calm, considered image ready for an architectural narrative."],
];

export default function Home() {
  return <main className="studio-page">
    <section className="studio-hero">
      <div className="hero-model"><ClientArchitectureViewer showMaterials materialSet="homepage" /></div>
      <div className="hero-overlay">
        <div className="hero-title-block"><p className="eyebrow">ARCHIVIA</p><h1>3D Architecture<br /><i>AI Visualization</i></h1></div>
        <div className="hero-foot"><p className="eyebrow">Villa Aurelia / 01<br />Interactive architectural study</p><a href="#material-studies" className="scroll-cue"><span>Scroll to explore</span><ArrowDownRight size={16} /></a></div>
      </div>
    </section>
    <section id="material-studies" className="material-intro wrap editorial-rule"><p className="eyebrow">01 / Material Studies</p><div><h2>One architecture.<br /><i>Multiple material expressions.</i></h2><p>The villa above is a live material study. Each palette modifies the same GLB surfaces—walls, stone, concrete, wood, metal, glass and paving—while its geometry remains intact.</p></div></section>
    <section className="digital-statement wrap"><p className="eyebrow">ARCHIVIA / Visual direction</p><h2>From digital<br /><i>to real.</i></h2><p>ARCHIVIA explores architecture through interactive 3D environments, material studies, AI visualization and photorealistic imagery.</p></section>
    <section className="ai-feature wrap"><aside><span className="feature-no">02</span><p className="eyebrow">AI Visualization</p></aside><div className="ai-visual"><div className="ai-caption eyebrow">Villa Aurelia / Exterior atmosphere</div></div><div className="ai-copy"><h2>Image-making with<br /><i>architectural discipline.</i></h2><p>ARCHIVIA combines built geometry with AI-assisted visual direction to study daylight, material mood and photographic composition before a final render is resolved.</p></div></section>
    <section id="process" className="process-section"><div className="wrap"><p className="eyebrow">03 / From model to image</p><div className="process-lead">A deliberate sequence<br />of <i>visual decisions.</i></div></div><div className="process-list wrap">{process.map(([number, title, description]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div></section>
    <section className="render-section wrap"><div className="render-heading"><p className="eyebrow">04 / Photorealistic renders</p><h2>Composed for<br /><i>slow looking.</i></h2></div><div className="render-editorial"><figure className="render-frame render-one"><figcaption>Exterior / 01</figcaption></figure><figure className="render-frame render-two"><figcaption>Interior / 02</figcaption></figure><figure className="render-frame render-three"><figcaption>Material / 03</figcaption></figure><figure className="render-frame render-four"><figcaption>Detail / 04</figcaption></figure></div></section>
    <section className="about-statement wrap editorial-rule"><p className="eyebrow">ARCHIVIA / About</p><h2>A visual exploration of architecture through <i>3D environments, material studies and AI visualization.</i></h2></section>
    <section className="contact-cta"><div className="wrap"><p className="eyebrow">Contact / Selected collaborations</p><h2>Let&apos;s visualize<br /><i>the next space.</i></h2><a href="mailto:studio@archivia.design">Studio@archivia.design <ArrowUpRight size={18} /></a></div></section>
  </main>;
}

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ClientArchitectureViewer } from "@/components/3d/ClientArchitectureViewer";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
export default function Home() {
  return (
    <main className="page">
      <section className="home-hero">
        <div className="hero-canvas">
          <ClientArchitectureViewer />
        </div>
        <div className="wrap hero-copy">
          <div className="reveal">
            <p className="eyebrow">ARCHIVIA · VISUALIZATION STUDIO</p>
            <h1 className="display">ARCHIVIA</h1>
            <p className="hero-title">
              Interactive architecture
              <br />& AI visualization
            </p>
          </div>
          <div className="hero-bottom">
            <p>
              Exploring the intersection of architectural 3D, AI-generated
              visualization and cinematic real-estate content.
            </p>
            <div>
              <Link className="button inverse" href="/projects/villa-aurelia">
                Explore Villa Aurelia <ArrowUpRight size={15} />
              </Link>
              <Link className="button inverse" href="/projects">
                View projects
              </Link>
            </div>
            <p className="eyebrow hero-info">
              Interactive 3D
              <br />
              Villa Aurelia
              <br />
              Modern Classic Residence
            </p>
          </div>
        </div>
      </section>
      <section className="wrap section">
        <SectionHeading
          label="Selected works"
          title="Architecture made tangible."
        />
        <div className="home-grid">
          {projects.slice(0, 2).map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </section>
      <section className="case-dark">
        <div className="wrap">
          <p className="eyebrow">The collection</p>
          <h2 className="display section-title">
            Spaces for
            <br />
            <i>slow looking.</i>
          </h2>
          <p style={{ maxWidth: 420, color: "#c5c5bd", lineHeight: 1.7 }}>
            Architecture, AI visualization and cinematic content designed to
            articulate spatial ideas with clarity.
          </p>
        </div>
      </section>
      <style>{`.home-hero{height:100svh;min-height:680px;background:#171716;position:relative;color:white;overflow:hidden}.hero-canvas{position:absolute;inset:0;opacity:.95}.hero-copy{height:100%;position:relative;z-index:1;pointer-events:none;display:flex;flex-direction:column;justify-content:space-between;padding-top:130px;padding-bottom:35px}.hero-copy h1{font-size:clamp(64px,11vw,160px);line-height:.82;margin:22px 0 24px}.hero-title{font-size:clamp(18px,2vw,26px);margin:0}.hero-bottom{display:grid;grid-template-columns:1fr 1.2fr auto;gap:30px;align-items:end}.hero-bottom>p{max-width:370px;font-size:13px;line-height:1.6}.hero-bottom div{display:flex;gap:10px;flex-wrap:wrap;pointer-events:auto}.hero-info{line-height:1.7;margin:0}.home-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6vw 28px}@media(max-width:700px){.hero-bottom{grid-template-columns:1fr;gap:16px}.hero-info{display:none}.home-grid{grid-template-columns:1fr}}`}</style>
    </main>
  );
}

import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
export default function Projects() {
  return (
    <main className="wrap" style={{ paddingTop: 160, paddingBottom: 110 }}>
      <p className="eyebrow">The collection · 04 projects</p>
      <h1
        className="display"
        style={{
          fontSize: "clamp(56px,10vw,132px)",
          lineHeight: 0.85,
          margin: "30px 0 88px",
        }}
      >
        Selected
        <br />
        <i>architecture.</i>
      </h1>
      <div className="grid">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
      <style>{`.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7vw 28px}@media(max-width:700px){.grid{grid-template-columns:1fr}}`}</style>
    </main>
  );
}

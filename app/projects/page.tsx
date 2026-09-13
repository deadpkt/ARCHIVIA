import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <main className="project-index">
      <header className="wrap project-index-head">
        <p className="eyebrow">Index / Selected studies</p>
        <h1>Projects<br /><i>in atmosphere.</i></h1>
        <p>A collection of architectural visualizations shaped through proportion, material and light.</p>
      </header>
      <section className="project-index-list">
        {projects.map((project, index) => (
          <Link href={`/projects/${project.id}`} className={`index-project project-${index}`} key={project.id}>
            <span className="index-number">0{index + 1}</span>
            <h2>{project.title}</h2>
            <span className="index-category">{project.category}</span>
            <div className="index-preview" aria-hidden="true"><span className="eyebrow">{project.location}</span></div>
            <ArrowUpRight className="index-arrow" size={20} />
          </Link>
        ))}
      </section>
    </main>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getProject, projects } from "@/data/projects";
import {
  BeforeAfter,
  PresentationFormats,
  RenderGallery,
  Workflow,
} from "@/components/architecture/CaseStudySections";
export function generateStaticParams() {
  return projects.map(({ id }) => ({ id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const project = getProject((await params).id);
  return { title: project ? `${project.title} — ARCHIVIA` : "ARCHIVIA" };
}
function Meta() {
  return (
    <div className="case-meta">
      {[
        ["Type", "Hillside Residence"],
        ["Style", "Contemporary"],
        ["Scope", "3D + AI Visualization"],
        ["Content", "Exterior / Interior / Material Studies"],
      ].map(([key, value]) => (
        <div key={key}>
          <span className="eyebrow">{key}</span>
          <b>{value}</b>
        </div>
      ))}
    </div>
  );
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const project = getProject((await params).id);
  if (!project) notFound();
  const isVilla = project.id === "villa-aurelia";
  return (
    <main>
      <section className="wrap case-head">
        <Link href="/projects" className="eyebrow">
          <ArrowLeft size={13} /> All projects
        </Link>
        <p className="eyebrow">{isVilla ? "01 / Architectural Visualization" : project.location}</p>
        <h1 className="display">{project.title}</h1>
        <h2>
          {isVilla ? "Contemporary Hillside Residence" : project.category}
        </h2>
        <p className="case-intro">
          {isVilla
            ? "An original contemporary hillside residence, developed as a complete 3D and AI architectural visualization study."
            : project.description}
        </p>
      </section>
      <section className="case-hero-art">
        <div>
          <span className="eyebrow">ARCHIVIA / VISUAL STUDY</span>
          <b className="display">
            Architecture
            <br />
            with atmosphere.
          </b>
        </div>
      </section>
      {isVilla && (
        <section className="wrap">
          <Meta />
        </section>
      )}
      {isVilla ? (
        <>
          <section className="wrap architectural-study">
            <p className="eyebrow">01 — 3D Architecture</p>
            <div className="study-architecture-art"><span className="eyebrow">Villa Aurelia / Spatial framework</span></div>
            <p className="study-copy">A measured 3D architectural framework establishes proportion, circulation, site and light before each visual expression is developed.</p>
          </section>
          <section className="wrap section material-note">
            <p className="eyebrow">02 — Material Studies</p>
            <h2 className="display section-title">
              Surface, light,
              <br />
              <i>and feeling.</i>
            </h2>
            <div>
              <p>
                <b>Warm Stone</b> — Ivory limestone + oak + bronze
              </p>
              <p>
                <b>Contemporary</b> — Light concrete + dark metal + glass
              </p>
              <p>
                <b>Earthen</b> — Travertine + walnut + warm stone
              </p>
            </div>
          </section>
          <Workflow />
          <BeforeAfter />
          <RenderGallery />
          <PresentationFormats />
        </>
      ) : (
        <section className="wrap section">
          <p className="eyebrow">Project narrative</p>
          <h2 className="display section-title">{project.description}</h2>
        </section>
      )}
      <style>{`.case-head{padding-top:145px;padding-bottom:65px}.case-head a{display:inline-flex;gap:8px;align-items:center}.case-head>p:nth-child(2){margin:75px 0 15px;color:var(--muted)}.case-head h1{font-size:clamp(68px,12vw,170px);line-height:.78;margin:0}.case-head h2{font-size:15px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;margin:25px 0}.case-intro{font:clamp(22px,3vw,40px)/1.2 'Playfair Display',serif;max-width:760px}.case-hero-art{height:min(60vw,800px);margin:0 4.5vw;background:linear-gradient(135deg,#272b28,#c5b69d 50%,#5e5548);position:relative;color:#fff;padding:28px;display:flex;align-items:end}.case-hero-art div{display:flex;justify-content:space-between;width:100%;align-items:end}.case-hero-art b{font-size:clamp(34px,7vw,100px);line-height:.82}.case-meta{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;padding:25px 0;border-bottom:1px solid var(--line)}.case-meta div{display:grid;gap:10px}.case-meta b{font-size:13px}.architectural-study{padding-top:120px;padding-bottom:20px}.study-architecture-art{height:min(57vw,720px);margin:28px 0;background:linear-gradient(145deg,#454a44,#9fa292 46%,#c3ad8d 46.5%,#393b35);position:relative;color:#fff}.study-architecture-art:after{content:'';position:absolute;inset:21% 13% 18% 35%;border:1px solid rgba(255,255,255,.35);box-shadow:-110px 86px 0 rgba(26,28,24,.25)}.study-architecture-art span{position:absolute;z-index:1;bottom:18px;left:18px}.study-copy{max-width:650px;margin:28px 0 0;font:clamp(19px,2.5vw,32px)/1.3 'Playfair Display',serif}.material-note{display:grid;grid-template-columns:1fr 2fr;gap:30px}.material-note .section-title{margin:0}.material-note div p{border-bottom:1px solid var(--line);padding:16px 0;margin:0;font-size:15px}@media(max-width:700px){.case-head{padding-top:120px}.case-hero-art{margin:0;height:110vw}.case-hero-art div{display:block}.case-hero-art b{display:block;margin-top:35px}.case-meta{grid-template-columns:1fr 1fr}.architectural-study{padding-top:80px}.study-architecture-art{height:95vw}.material-note{grid-template-columns:1fr}.material-note .section-title{margin:20px 0}}`}</style>
    </main>
  );
}

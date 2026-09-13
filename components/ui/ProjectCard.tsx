"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
const backgrounds: Record<Project["variant"], string> = {
  villa: "linear-gradient(145deg,#7c8178,#d4cbb9 45%,#534d43 46%,#a8b0a0)",
  mountain: "linear-gradient(150deg,#4f5c54,#89917d 40%,#c2af91 41%,#4a443b)",
  penthouse: "linear-gradient(135deg,#b6a992,#5e5146 48%,#c9b9a1 49%,#827564)",
  hotel: "linear-gradient(140deg,#cabba5,#9e8a70 50%,#50463d 51%,#c8b79b)",
};
export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      className="project-card"
    >
      <Link href={`/projects/${project.id}`}>
        <div
          className="project-art"
          style={{ background: backgrounds[project.variant] }}
        >
          <div className="art-building" />
        </div>
        <div className="card-meta">
          <div>
            <p className="eyebrow">
              0{index + 1} · {project.category}
            </p>
            <h3 className="display">{project.title}</h3>
            <p className="description">{project.description}</p>
          </div>
          <ArrowUpRight className="card-arrow" size={20} />
        </div>
        <span className="eyebrow view-project">View project</span>
      </Link>
      <style jsx>{`
        .project-art {
          height: clamp(260px, 38vw, 520px);
          overflow: hidden;
          position: relative;
        }
        .art-building {
          position: absolute;
          inset: 25% 12% 18%;
          background: rgba(238, 233, 220, 0.53);
          box-shadow: 80px 25px 0 rgba(30, 32, 28, 0.25);
          transition: transform 0.7s;
        }
        .project-card:hover .art-building {
          transform: scale(1.08);
        }
        .card-meta {
          display: flex;
          justify-content: space-between;
          align-items: end;
          padding: 16px 0 7px;
        }
        .card-meta h3 {
          font-size: 28px;
          margin: 8px 0;
        }
        .card-meta p {
          margin: 0;
        }
        .description {
          color: var(--muted);
          font-size: 12px;
          line-height: 1.6;
          max-width: 400px;
        }
        .card-arrow {
          opacity: 0;
          transform: translate(-8px, 8px);
          transition: 0.35s;
        }
        .project-card:hover .card-arrow {
          opacity: 1;
          transform: none;
        }
        .view-project {
          display: block;
          border-top: 1px solid var(--line);
          padding-top: 10px;
          color: var(--muted);
        }
      `}</style>
    </motion.div>
  );
}

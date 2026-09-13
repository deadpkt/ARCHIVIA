"use client";
import { motion } from "framer-motion";
import { useState } from "react";
const stages = [
  "3D Architectural Concept",
  "AI Image Development",
  "Photorealistic Visualization",
  "Material Studies",
];
const renders = [
  "Hero Exterior",
  "Garden / Pool",
  "Living Room",
  "Kitchen / Dining",
  "Master Bedroom",
  "Blue Hour Exterior",
];
export function Workflow() {
  return (
    <section className="case-dark">
      <div className="wrap">
        <p className="eyebrow">Process</p>
        <h2 className="display section-title">
          AI Visualization
          <br />
          <i>Workflow.</i>
        </h2>
        <p className="workflow-copy">
          AI is used as a visualization layer on top of the architectural
          concept — preserving composition, materials, proportions and design
          intent while developing photorealistic architectural imagery and
          material-led render studies.
        </p>
        <div className="workflow">
          {stages.map((stage, index) => (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="workflow-step"
              key={stage}
            >
              <span className="eyebrow">0{index + 1}</span>
              <strong>{stage}</strong>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
export function BeforeAfter() {
  const [value, setValue] = useState(52);
  return (
    <section className="wrap section">
      <p className="eyebrow">From 3D to photorealism</p>
      <h2 className="display section-title">
        A visualization layer
        <br />
        <i>with intent.</i>
      </h2>
      <div className="comparison">
        <div className="comparison-base">
          <span>3D / Base scene</span>
        </div>
        <div
          className="comparison-render"
          style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
        >
          <span>AI enhancement / Final visual</span>
        </div>
        <input
          aria-label="Compare base scene and final visual"
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => setValue(+e.target.value)}
        />
        <i style={{ left: `${value}%` }} />
      </div>
      <p className="eyebrow compare-caption">
        3D / Base Scene → AI Enhancement → Final Visual
      </p>
    </section>
  );
}
export function RenderGallery() {
  return (
    <section className="wrap section">
      <p className="eyebrow">Photorealistic visualization</p>
      <div className="render-grid">
        {renders.map((render, index) => (
          <article className={`render render-${index}`} key={render}>
            <div className="render-image">
              <span className="eyebrow">0{index + 1}</span>
            </div>
            <h3 className="display">{render}</h3>
            <p className="eyebrow">Asset-ready editorial frame</p>
          </article>
        ))}
      </div>
    </section>
  );
}
export function PresentationFormats() {
  const presentationFormats = [
    "Exterior Render",
    "Interior Render",
    "Material Study",
    "Real-estate Marketing Visual",
  ];
  return (
    <>
      <section className="case-dark video-section">
        <div className="wrap">
          <p className="eyebrow">Presentation formats</p>
          <h2 className="display section-title">Architecture, resolved.</h2>
          <p className="video-copy">
            A considered suite of visuals that carries Villa Aurelia from
            spatial concept to a clear, market-ready architectural narrative.
          </p>
          <div className="film">
            <span className="eyebrow">
              3D Architecture / AI Visualization
            </span>
            <b className="display">
              VILLA
              <br />
              AURELIA
            </b>
            <span className="eyebrow">
              Exterior / Interior / Material / Marketing
            </span>
          </div>
          <p className="eyebrow">
            Photorealistic renders and material studies developed from the
            architectural model.
          </p>
        </div>
      </section>
      <section className="wrap section">
        <p className="eyebrow">Visual deliverables</p>
        <h2 className="display section-title">
          A project, composed
          <br />
          <i>for every touchpoint.</i>
        </h2>
        <div className="marketing">
          {presentationFormats.map((format, index) => (
            <div className={`format format-${index}`} key={format}>
              <span className="eyebrow">{format}</span>
              <b className="display">
                Villa
                <br />
                Aurelia
              </b>
              <small>
                Villa Aurelia
                <br />
                Architectural visualization study
              </small>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

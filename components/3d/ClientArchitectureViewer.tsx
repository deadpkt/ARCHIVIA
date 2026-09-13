"use client";
import dynamic from "next/dynamic";
const ArchitectureViewer = dynamic(
  () =>
    import("./ArchitectureViewer").then((module) => module.ArchitectureViewer),
  { ssr: false },
);
export function ClientArchitectureViewer(props: {
  variant?: string;
  showMaterials?: boolean;
  materialSet?: "project" | "homepage";
}) {
  return <ArchitectureViewer {...props} />;
}

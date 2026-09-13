export type Project = {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  materials: string[];
  features: string[];
  heroImage: string;
  gallery: string[];
  modelPath: string;
  variant: "villa" | "mountain" | "penthouse" | "hotel";
};
export const projects: Project[] = [
  {
    id: "villa-aurelia",
    title: "Villa Aurelia",
    category: "Modern Classic Residence",
    location: "Concept Project",
    description:
      "A contemporary interpretation of classical residential architecture, combining natural limestone, refined proportions, expansive glazing and warm modern interiors.",
    materials: [
      "Ivory Limestone",
      "Natural Oak",
      "Dark Bronze",
      "Travertine",
      "Warm Brass",
    ],
    features: [
      "Symmetrical composition",
      "Floor-to-ceiling glazing",
      "Double-height living space",
      "Reflecting pool",
      "Landscaped courtyard",
      "Modern classical proportions",
    ],
    heroImage: "/images/villa-aurelia.jpg",
    gallery: [
      "/images/aurelia-01.jpg",
      "/images/aurelia-02.jpg",
      "/images/aurelia-03.jpg",
    ],
    modelPath: "/models/villa-aurelia.glb",
    variant: "villa",
  },
  {
    id: "casa-alta",
    title: "Casa Alta",
    category: "Mountain Retreat",
    location: "Svaneti, Georgia",
    description:
      "A quiet contemporary retreat set into the contours of a mountain landscape, where concrete planes frame cedar-lined rooms and wide horizons.",
    materials: ["Concrete", "Cedar", "Glass", "Natural stone"],
    features: [
      "Terraced plan",
      "Mountain views",
      "Sheltered courtyard",
      "Material restraint",
    ],
    heroImage: "/images/casa-alta.jpg",
    gallery: [],
    modelPath: "/models/casa-alta.glb",
    variant: "mountain",
  },
  {
    id: "tbilisi-penthouse",
    title: "Tbilisi Penthouse",
    category: "Urban Residential",
    location: "Tbilisi, Georgia",
    description:
      "A composed urban interior with soft daylight, tactile natural materials and a sequence of spaces opening toward the city.",
    materials: ["Travertine", "Oak", "Walnut", "Brushed brass"],
    features: [
      "Panoramic terrace",
      "Gallery circulation",
      "Custom joinery",
      "Layered lighting",
    ],
    heroImage: "/images/tbilisi-penthouse.jpg",
    gallery: [],
    modelPath: "/models/tbilisi-penthouse.glb",
    variant: "penthouse",
  },
  {
    id: "atelier-no-7",
    title: "Atelier No. 7",
    category: "Boutique Hotel",
    location: "Lisbon, Portugal",
    description:
      "A hospitality project composed as a series of intimate rooms, balancing historic character with carefully edited modern interventions.",
    materials: ["Limestone", "Walnut", "Brass", "Textured plaster"],
    features: [
      "Courtyard rooms",
      "Restored facade",
      "Intimate public spaces",
      "Craft details",
    ],
    heroImage: "/images/atelier-no-7.jpg",
    gallery: [],
    modelPath: "/models/atelier-no-7.glb",
    variant: "hotel",
  },
];
export function getProject(id: string) {
  return projects.find((project) => project.id === id);
}

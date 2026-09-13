import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <Link href="/" className="footer-mark">ARCHIVIA</Link>
        <p className="eyebrow">3D Architecture<br />AI Visualization</p>
        <p className="eyebrow footer-copy">© 2026 Archivia<br />Tbilisi / Everywhere</p>
      </div>
    </footer>
  );
}

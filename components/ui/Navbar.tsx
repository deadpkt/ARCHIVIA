"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Index" },
  { href: "/projects", label: "Projects" },
  { href: "/#process", label: "Process" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`site-nav ${scrolled ? "is-scrolled" : ""}`}>
      <nav className="site-nav-inner">
        <Link href="/" className="site-mark" aria-label="ARCHIVIA home">ARCHIVIA</Link>
        <div className="site-links">{links.map((link) => <Link href={link.href} key={link.label}>{link.label}</Link>)}</div>
        <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X size={18} /> : <Menu size={18} />}</button>
      </nav>
      <AnimatePresence>{open && <motion.div className="mobile-nav" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><span className="eyebrow">Navigation</span><div>{links.map((link, index) => <motion.div key={link.label} initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: index * 0.06 }}><Link href={link.href} onClick={() => setOpen(false)}>{link.label}</Link></motion.div>)}</div></motion.div>}</AnimatePresence>
    </header>
  );
}

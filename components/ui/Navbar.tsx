"use client";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
export function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
  ];
  return (
    <header
      style={{
        position: "fixed",
        zIndex: 20,
        top: 0,
        width: "100%",
        color: "white",
        mixBlendMode: "difference",
      }}
    >
      <nav
        className="wrap"
        style={{
          height: 76,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/"
          className="eyebrow"
          style={{ fontSize: 13, fontWeight: 500 }}
        >
          ARCHIVIA
        </Link>
        <div
          style={{ display: "flex", gap: 28, alignItems: "center" }}
          className="navlinks"
        >
          {links.map((l) => (
            <Link className="eyebrow" key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
          <Link
            href="/projects"
            className="eyebrow"
            style={{ display: "flex", gap: 5, alignItems: "center" }}
          >
            3D Gallery <ArrowUpRight size={13} />
          </Link>
        </div>
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          className="mobile-menu"
          style={{ background: "none", border: 0, color: "inherit" }}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100vh - 76px)" }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: "#171716",
              padding: "42px 22px",
              overflow: "hidden",
            }}
          >
            {links.map((l) => (
              <Link
                onClick={() => setOpen(false)}
                key={l.href}
                href={l.href}
                className="display"
                style={{
                  display: "block",
                  fontSize: 48,
                  color: "#e9e6df",
                  padding: "12px 0",
                }}
              >
                {l.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <style jsx>{`
        .mobile-menu {
          display: none;
        }
        @media (max-width: 700px) {
          .navlinks {
            display: none !important;
          }
          .mobile-menu {
            display: block;
          }
        }
      `}</style>
    </header>
  );
}

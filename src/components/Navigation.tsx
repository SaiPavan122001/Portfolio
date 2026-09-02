"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, Mail, Command } from "lucide-react";
import { profile } from "@/data/portfolio";
import { scrollToTarget } from "@/components/SmoothScroll";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = navLinks.map((link) => link.href.substring(1));
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToTarget(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/90 backdrop-blur-md border-b border-border py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center gap-2 text-lg font-semibold tracking-tight hover:text-accent transition-colors group">
            <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(59,130,246,0.8)] group-hover:animate-pulse" aria-hidden="true" />
            {profile.name.split(" ").pop()}
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm transition-colors relative group ${
                  activeSection === link.href.substring(1) ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${
                  activeSection === link.href.substring(1) ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </a>
            ))}
            <button
              onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }))}
              aria-label="Open command palette"
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs border border-border rounded-md text-muted-foreground hover:text-foreground hover:border-accent/50 transition-colors"
            >
              <Command size={12} /> K
            </button>
            <a href="/resume.pdf" target="_blank" className="px-4 py-2 text-sm bg-foreground text-background rounded-md hover:bg-muted-foreground transition-colors">
              Resume
            </a>
          </div>

          <button className="md:hidden p-2 text-foreground" onClick={() => setIsMobileMenuOpen(true)} aria-label="Open menu">
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex items-center justify-between mb-12">
                <span className="text-lg font-semibold">{profile.name}</span>
                <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
                  <X size={24} />
                </button>
              </div>
              <nav className="flex flex-col gap-6 flex-1">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`text-2xl font-light ${activeSection === link.href.substring(1) ? "text-accent" : "text-foreground"}`}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>
              <div className="flex gap-6 pt-6 border-t border-border">
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-border/50 rounded-full hover:bg-border transition-colors" aria-label="GitHub">
                  <Github size={20} />
                </a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-border/50 rounded-full hover:bg-border transition-colors" aria-label="LinkedIn">
                  <Linkedin size={20} />
                </a>
                <a href={`mailto:${profile.email}`} className="p-3 bg-border/50 rounded-full hover:bg-border transition-colors" aria-label="Email">
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

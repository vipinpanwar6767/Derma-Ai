import { Menu, X } from "lucide-react";
import { useState } from "react";

import Button from "../../common/Button";
import Container from "../../common/Container";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Scan", href: "#scan" },
  { label: "About", href: "#about" },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen((previousState) => !previousState);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur-xl">
      <Container>
        <nav
          className="flex min-h-20 items-center justify-between"
          aria-label="Main navigation"
        >
          <a
            href="#home"
            onClick={closeMenu}
            className="shrink-0"
            aria-label="DermaAI home"
          >
            <span
              style={{ fontFamily: "Poppins, sans-serif" }}
              className="text-2xl font-bold tracking-tight text-white"
            >
              Derma<span className="text-cyan-400">AI</span>
            </span>
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-slate-300 transition hover:text-cyan-400"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 md:flex">
            <Button variant="ghost">Log In</Button>
            <Button>Get Started</Button>
          </div>

          <button
            type="button"
            onClick={toggleMenu}
            className="inline-flex items-center justify-center rounded-lg border border-slate-700 p-2 text-slate-200 transition hover:border-cyan-500/50 hover:bg-slate-900 hover:text-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 md:hidden"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {isMenuOpen && (
          <div
            id="mobile-navigation"
            className="border-t border-slate-800 py-5 md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="block rounded-lg px-3 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-900 hover:text-cyan-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-5 grid gap-3 border-t border-slate-800 pt-5">
              <Button variant="secondary" className="w-full">
                Log In
              </Button>

              <Button className="w-full">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}

export default Navbar;
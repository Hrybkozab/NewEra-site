import { NavLink, Route, Routes, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Globe,
  Play,
  Camera,
  Gamepad2,
  ChevronRight,
  MessageCircle
} from "lucide-react";
import Home from "./pages/Home";
import Team from "./pages/Team";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Centralized route labels are reused in both the header and footer navigation.
const navLinks = [
  { to: "/", label: "Home" },
  { to: "/team", label: "Team" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" }
];

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Reset scroll only when switching pages, not when query params change inside a page.
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Navbar gets a stronger background after the user scrolls down.
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-[#00ff87]/20 bg-black/95 shadow-lg shadow-black/50 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src="/images/newera-logo.png"
            alt="NewEra logo"
            className="h-12 w-16 object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col leading-none">
            <span className="text-lg font-black tracking-widest text-white">
              NEW<span className="text-[#00ff87]">ERA</span>
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#00ff87]/60">
              Brawl Stars
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `rounded-lg px-4 py-2 text-sm font-semibold tracking-wide transition-all duration-200 ${
                  isActive
                    ? "bg-[#00ff87]/10 text-[#00ff87]"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <a
            href="https://discord.gg/jW5Tg53V"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 flex items-center gap-2 rounded-full bg-[#00ff87] px-5 py-2 text-sm font-bold text-black transition-all duration-200 hover:scale-105 hover:bg-[#00ff87]/90"
          >
            <MessageCircle size={15} />
            Join Us
          </a>
        </div>

        <button
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg p-2 text-white transition-colors hover:bg-white/10 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-2 border-t border-[#00ff87]/20 bg-black/98 px-6 py-6 md:hidden">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `rounded-xl px-4 py-3 text-sm font-semibold tracking-wide transition-all ${
                  isActive
                    ? "bg-[#00ff87]/10 text-[#00ff87]"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <a
            href="https://discord.gg/jW5Tg53V"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#00ff87] px-5 py-3 text-sm font-bold text-black"
          >
            <MessageCircle size={15} />
            Join Our Discord
          </a>
        </div>
      )}
    </nav>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#00ff87]/20 bg-black pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="mb-4 flex items-center gap-3">
              <img
                src="/images/newera-logo.png"
                alt="NewEra logo"
                className="h-12 w-16 object-contain"
              />
              <div className="flex flex-col leading-none">
                <span className="text-lg font-black tracking-widest text-white">
                  NEW<span className="text-[#00ff87]">ERA</span>
                </span>
                <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#00ff87]/60">
                  Brawl Stars
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-500">
              Competing at the highest level of Brawl Stars. Representing the next generation of esports.
            </p>
            <div className="mt-5 flex gap-3">
              {[
                { icon: <Globe size={16} />, href: "#", label: "Twitter" },
                { icon: <Camera size={16} />, href: "#", label: "Instagram" },
                { icon: <Play size={16} />, href: "#", label: "YouTube" },
                { icon: <Gamepad2 size={16} />, href: "#", label: "Twitch" }
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400 transition-all duration-200 hover:border-[#00ff87]/40 hover:bg-[#00ff87]/10 hover:text-[#00ff87]"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">Navigation</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group flex items-center gap-1 text-sm text-gray-500 transition-colors hover:text-[#00ff87]"
                  >
                    <ChevronRight size={12} className="opacity-0 transition-opacity group-hover:opacity-100" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">Discipline</h4>
            <ul className="space-y-2">
              {["Brawl Stars", "Competitive Scene", "Patch Notes"].map((item) => (
                <li key={item}>
                  <span className="group flex cursor-pointer items-center gap-1 text-sm text-gray-500 transition-colors hover:text-[#00ff87]">
                    <ChevronRight size={12} className="opacity-0 transition-opacity group-hover:opacity-100" />
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">Get In Touch</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <span className="mb-1 block text-xs uppercase tracking-wider text-[#00ff87]/70">
                  Partnerships
                </span>
                <span>partnerships@newera.gg</span>
              </li>
              <li>
                <span className="mb-1 block text-xs uppercase tracking-wider text-[#00ff87]/70">
                  Tryouts
                </span>
                <span>tryouts@newera.gg</span>
              </li>
              <li>
                <span className="mb-1 block text-xs uppercase tracking-wider text-[#00ff87]/70">
                  General
                </span>
                <span>hello@newera.gg</span>
              </li>
            </ul>
            <a
              href="https://discord.gg/jW5Tg53V"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#00ff87]/30 bg-[#00ff87]/10 px-4 py-2 text-xs font-bold text-[#00ff87] transition-all hover:bg-[#00ff87]/20"
            >
              <MessageCircle size={13} />
              Discord Community
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-xs text-gray-600 md:flex-row">
          <p>© 2024 NewEra Esports. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="cursor-pointer transition-colors hover:text-gray-400">Privacy Policy</span>
            <span className="cursor-pointer transition-colors hover:text-gray-400">Terms of Service</span>
            <span className="cursor-pointer transition-colors hover:text-gray-400">Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      {/* Keeps navigation transitions feeling natural in a single-page app. */}
      <ScrollToTop />
      <Navbar />
      {/* Every page is rendered inside the shared app shell below. */}
      <main className="min-h-screen bg-black pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

"use client";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  // 🔹 Highlight section while scrolling
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 150; // adjust offset
      navItems.forEach((item) => {
        const section = document.querySelector(item.href);
        if (section) {
          const { top, height } = section.getBoundingClientRect();
          const sectionTop = window.scrollY + top;
          if (scrollY >= sectionTop && scrollY < sectionTop + height) {
            setActive(item.href.replace("#", ""));
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔹 Smooth scrolling behavior
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.style.scrollBehavior = "smooth";
    }
  }, []);

  return (
    <nav className="bg-white to-[#70e84f] text-black sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <Image
            src="/iot.png"
            alt="iot logo"
            width={48}
            height={48}
            className="object-contain"
          />
          <span>Isaac Okhua Tech Co.</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`hover:text-gray-100 transition ${
                active === item.href.replace("#", "")
                  ? "text-[#70e84f] font-semibold"
                  : ""
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen((p) => !p)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-white text-gray-800 shadow-md border-t">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`block px-6 py-3 ${
                active === item.href.replace("#", "")
                  ? "bg-indigo-50 text-[#70e84f]"
                  : ""
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

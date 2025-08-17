"use client";

import { useState , useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react"; // Importing icons

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  
  return (
    <header className="w-full p-4 bg-gradient-to-r from-orange-600 to-black text-white fixed top-0 z-50">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link href={"/"}>
          <Image
            src="/rsba_logo.jpeg"
            alt="RSBA Logo" href="/home"
            width={40}
            height={40}
            //style={{ width: "auto", height: "auto" }}
            className="ml-4 mr-4 rounded-full"
            pathname="/home"
            priority
          /></Link>

          <Link href={"/"}>
          <h1 className="text-2xl font-bold">RSBA</h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 justify-center">
          <ul className="flex gap-6">
            {[
              { name: "Home", path: "/" },
              { name: "Coaches", path: "/coaches" },
              { name: "Players", path: "/players" },
              { name: "Management", path: "/management" },
              { name: "Packages", path: "/packages" },
              { name: "Contact Us", path: "/#contact-us" },
            ].map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`pb-2 transition-colors duration-800 ${pathname === item.path
                      ? "border-b-2 border-orange-500" // Active page
                      : "border-b-2 border-transparent hover:border-orange-300"
                    }`}
                >
                  {item.name}
                  
                </Link>
              </li>
            ))}
            
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="bg-orange-600 text-white p-2 rounded-lg shadow-lg"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-black text-white p-4 md:hidden">
          <ul className="space-y-3 text-center">
            {[
              { name: "Home", path: "/" },
              { name: "Coaches", path: "/coaches" },
              { name: "Players", path: "/players" },
              { name: "Management", path: "/management" },
              { name: "Packages", path: "/packages" },
              { name: "Contact Us", path: "/#contact-us" },
            ].map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className="block p-2 text-lg hover:bg-orange-600 hover:text-white transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)} // Close menu on click
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

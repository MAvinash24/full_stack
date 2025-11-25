"use client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon, User } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#1a0b2e]/90 backdrop-blur-md px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="text-2xl font-bold tracking-tighter text-white">
          ML<span className="text-brand-accent">era</span>
        </div>
        <div className="hidden gap-8 text-sm font-medium text-gray-300 md:flex">
          <Link href="/" className="hover:text-white">Home</Link>
          <Link href="/build" className="hover:text-white">Build Model</Link>
          <Link href="#" className="hover:text-white">Learning Path</Link>
        </div>
        <div className="flex items-center gap-4">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full bg-white/10 p-2 text-yellow-400 hover:bg-white/20"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <User size={16} className="text-white"/>
          </div>
        </div>
      </div>
    </nav>
  );
}
"use client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#1a0b2e] shadow-md transition-colors duration-300 dark:bg-[#1a0b2e] dark:border-white/10 bg-white border-gray-200">
      {/* Changed max-w-7xl to max-w-5xl to match page content */}
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <div className="text-3xl font-bold tracking-tighter">
          <span className="text-[#f97316]">ML</span>
          <span className="text-[#a855f7]">era</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden items-center gap-6 text-sm font-medium text-gray-500 dark:text-gray-300 md:flex">
          <Link href="/" className="hover:text-purple-600 dark:hover:text-white transition-colors">Home</Link>
          <Link href="/learning-path" className="hover:text-purple-600 dark:hover:text-white transition-colors">Learning Path</Link>
          <Link href="/challenges" className="hover:text-purple-600 dark:hover:text-white transition-colors">Challenges</Link>
          <Link href="/my-courses" className="hover:text-purple-600 dark:hover:text-white transition-colors">My Courses</Link>
          <Link href="/achievements" className="hover:text-purple-600 dark:hover:text-white transition-colors">Achievements</Link>
          <Link href="/buddy" className="hover:text-purple-600 dark:hover:text-white transition-colors">Buddy</Link>
          <Link href="/lexicon" className="hover:text-purple-600 dark:hover:text-white transition-colors">Lexicon</Link>
        </div>

        {/* Right Side: Toggle & Profile Image */}
        <div className="flex items-center gap-6">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="group flex items-center justify-center rounded-full p-2 transition-transform hover:scale-110 focus:outline-none"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun size={24} className="text-white group-hover:text-yellow-400 transition-colors" />
              ) : (
                <Moon size={24} className="text-gray-700 group-hover:text-purple-600 transition-colors" />
              )}
            </button>
          )}

          <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-gray-500/50 cursor-pointer hover:border-white transition-colors">
             <img 
               src="https://avatar.iran.liara.run/public/boy?username=Ash" 
               alt="User Profile" 
               className="h-full w-full object-cover"
             />
          </div>
        </div>
      </div>
    </nav>
  );
}
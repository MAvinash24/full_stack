import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface ModuleHeaderProps {
  title: string;
  currentStep: number;
  totalSteps: number;
  prevLink?: string;
  breadcrumb?: string; 
}

export default function ModuleHeader({ 
  title, 
  currentStep, 
  totalSteps, 
  prevLink = "#",
  breadcrumb = "Content" 
}: ModuleHeaderProps) {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-10 w-full space-y-8">
      {/* Breadcrumbs - No extra padding here, it inherits from parent */}
      <div className="flex items-center gap-2 text-sm font-medium text-purple-400">
        <Link href="/" className="hover:text-purple-600 dark:hover:text-white transition-colors">Home</Link>
        <ChevronRight size={14} />
        <span className="cursor-pointer hover:text-purple-600 dark:hover:text-white transition-colors">Learning Path</span>
        <ChevronRight size={14} />
        <span className="cursor-default text-purple-400/70">...</span>
        <ChevronRight size={14} />
        <span className="font-bold text-purple-600 dark:text-purple-300">{breadcrumb}</span>
      </div>

      {/* Main Title */}
      <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
        <span className="bg-gradient-to-r from-[#fb7185] to-[#c084fc] bg-clip-text text-transparent">
          {title}
        </span>
      </h1>

      {/* Progress Bar */}
      <div className="flex items-end justify-between border-b border-gray-200 dark:border-white/10 pb-8">
        <div className="w-full max-w-xs space-y-3">
          <div className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            Module progress: {currentStep} / {totalSteps}
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-[#1e1b2e] border border-gray-300 dark:border-white/5">
            <div 
              className="h-full bg-gradient-to-r from-orange-500 to-rose-500 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(244,63,94,0.5)]" 
              style={{ width: `${progressPercentage}%` }} 
            />
          </div>
        </div>

        <Link
          href={prevLink}
          className="flex items-center gap-1 rounded-lg border border-purple-500/30 bg-transparent px-6 py-2 text-sm font-bold text-purple-600 dark:text-white transition-all hover:border-purple-400 hover:bg-purple-500/10"
        >
          <span className="text-lg leading-none mb-0.5">&lsaquo;</span> Previous
        </Link>
      </div>
    </div>
  );
}
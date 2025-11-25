export default function Card({ title, children, className = "" }: { title?: string, children: React.ReactNode, className?: string }) {
  return (
    <div className={`rounded-xl border p-6 shadow-xl transition-colors duration-300
      bg-white border-gray-200 text-gray-800               /* Light Mode Styles */
      dark:bg-[#2e1065] dark:border-white/5 dark:text-white /* Dark Mode Styles */
      ${className}`}
    >
      {title && (
        <h2 className="mb-4 text-xl font-bold flex items-center gap-2 text-[#d946ef] dark:text-[#d946ef]">
           {/* Pink/Purple title looks good in both modes */}
           <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fce7f3] text-[#db2777] dark:bg-pink-500 dark:text-white text-sm">
             {title.split('.')[0]}
           </span>
           {title.substring(title.indexOf('.') + 1)}
        </h2>
      )}
      {children}
    </div>
  );
}
export default function Card({ title, children, className = "" }: { title?: string, children: React.ReactNode, className?: string }) {
  return (
    <div className={`rounded-xl border border-white/5 bg-[#2e1065] p-6 shadow-xl ${className}`}>
      {title && (
        <h2 className="mb-4 text-xl font-bold text-brand-accent flex items-center gap-2">
           {/* Number Badge could be dynamic */}
           {title}
        </h2>
      )}
      {children}
    </div>
  );
}
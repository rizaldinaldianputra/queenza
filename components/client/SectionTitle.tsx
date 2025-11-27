export const SectionTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="text-center mb-12 relative z-10">
    {subtitle && (
      <span className="text-rose-500 font-semibold tracking-widest text-sm uppercase mb-2 block">
        {subtitle}
      </span>
    )}
    <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-500 to-orange-400 pb-2">
      {title}
    </h2>
    <div className="w-24 h-1 bg-pink-400 mx-auto mt-4 rounded-full"></div>
  </div>
);

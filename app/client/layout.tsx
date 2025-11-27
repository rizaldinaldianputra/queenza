export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-sans bg-pink-50 text-slate-800 min-h-screen">
      {children}
    </div>
  );
}

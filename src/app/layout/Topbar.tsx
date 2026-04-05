import { Sparkles, Command } from "lucide-react";

const environment = import.meta.env.VITE_APP_ENV ?? import.meta.env.MODE;

export function Topbar() {
  return (
    <header className="sticky top-0 z-20 flex min-h-16 lg:min-h-20 items-center justify-between border-b border-indigo-100/50 bg-white/70 px-4 backdrop-blur-xl sm:px-6 md:px-8 shadow-[0_4px_30px_-10px_rgba(79,70,229,0.1)]">
      <div className="flex min-w-0 items-center gap-3">
        <div className="hidden h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-500 sm:flex">
          <Command size={18} />
        </div>
        <div>
          <h1 className="truncate text-base font-bold tracking-tight text-indigo-950 sm:text-lg">
            Engineering Intelligence System
          </h1>
          <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-indigo-400">
            <Sparkles size={10} className="text-cyan-400" /> Workspace Analytics
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="shrink-0 rounded-full border border-emerald-200/50 bg-emerald-50/80 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-emerald-600 shadow-sm shadow-emerald-100 sm:px-4">
          <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
          {environment}
        </div>
      </div>
    </header>
  );
}

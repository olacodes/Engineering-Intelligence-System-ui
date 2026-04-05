import { NavLink } from "react-router-dom";
import {
  MessageSquare,
  Search,
  Activity,
  Database,
  Blocks,
} from "lucide-react";
import { navigationItems } from "./navigation";

const iconMap = {
  "/ask": MessageSquare,
  "/search": Search,
  "/ingestion": Database,
  "/system": Activity,
};

const baseItemClass =
  "flex flex-col gap-1 rounded-2xl border px-3.5 py-3 text-sm transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]";

export function Sidebar() {
  return (
    <aside className="w-full border-b border-indigo-100 bg-white/70 px-4 py-4 backdrop-blur-xl lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:border-b-0 lg:border-r lg:px-5 lg:py-6 lg:bg-white/40 shadow-sm">
      <div className="mb-4 flex items-center gap-2 lg:mb-8 text-indigo-900">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 text-white shadow-md shadow-indigo-200">
          <Blocks size={18} strokeWidth={2.5} />
        </div>
        <span className="font-bold tracking-tight text-[15px]">
          EIS Navigator
        </span>
      </div>
      <div className="mb-3 lg:mb-5">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Modules
        </p>
      </div>
      <nav className="flex gap-2.5 overflow-x-auto pb-1.5 lg:grid lg:gap-3 lg:overflow-x-visible lg:pb-0 scrollbar-hide">
        {navigationItems.map((item) => {
          const Icon = iconMap[item.path as keyof typeof iconMap] || Blocks;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `min-w-[170px] shrink-0 lg:min-w-0 flex items-start gap-3 ${baseItemClass} ${
                  isActive
                    ? "border-indigo-200/50 bg-white shadow-md shadow-indigo-100/50 text-indigo-950 ring-1 ring-indigo-50"
                    : "border-transparent text-slate-600 hover:bg-white/60 hover:shadow-sm"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                      isActive
                        ? "bg-indigo-50 text-indigo-600"
                        : "bg-slate-100/80 text-slate-400"
                    }`}
                  >
                    <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                  </div>
                  <div className="flex flex-col">
                    <div
                      className={`font-semibold ${isActive ? "text-indigo-900" : "text-slate-700"}`}
                    >
                      {item.label}
                    </div>
                    <div className="mt-0.5 text-xs text-slate-500 leading-tight">
                      {item.description}
                    </div>
                  </div>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

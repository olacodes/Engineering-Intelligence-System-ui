import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function AppLayout() {
  return (
    <div className="flex min-h-screen font-sans text-slate-800 selection:bg-indigo-100 selection:text-indigo-900">
      <div className="mx-auto w-full max-w-[2000px] lg:flex lg:h-screen lg:overflow-hidden">
        <Sidebar />
        <div className="flex w-full min-w-0 flex-1 flex-col lg:overflow-y-auto lg:h-screen">
          <Topbar />
          <main className="flex-1 px-4 py-6 sm:px-6 md:px-8 lg:px-10 lg:py-8">
            <div className="mx-auto w-full max-w-[1280px]">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import SidebarPanel from "./components/sidebar-panel.tsx";
import Menubar from "./components/menubar.tsx";

const App = () => (
  <div className="flex h-full" data-theme="latetwist">
    <SidebarPanel />
    <div className="w-54 bg-neutral text-base-100">evan</div>
    <main className="flex flex-col flex-1 w-full">
      <Menubar />
      <section className="flex-1 p-4 overflow-auto">
        {/* Replace with your main content */}
        main content
      </section>
    </main>
  </div>
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

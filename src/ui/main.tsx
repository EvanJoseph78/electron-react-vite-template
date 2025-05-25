import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import SidebarPanel from "./components/sidebar-panel.tsx";
import Menubar from "./components/menubar.tsx";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.tsx";

function App() {
  return (
    <div className="flex h-full" data-theme="latetwist">
      <SidebarPanel />
      <main className="flex flex-col flex-1 w-full">
        <Menubar />
        <section className="flex-1 p-4 overflow-auto">
          <AppRoutes />
        </section>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

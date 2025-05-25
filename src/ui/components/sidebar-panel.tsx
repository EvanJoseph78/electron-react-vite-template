import { useState } from "react";
import { HelpCircle, Home, Info, LogOut, Settings, User } from "lucide-react";

const sidebarItems = [
  { icon: <Home />, label: "Home" },
  { icon: <User />, label: "User" },
  { icon: <Settings />, label: "Settings" },
  { icon: <HelpCircle />, label: "Help" },
  { icon: <Info />, label: "About" },
  { icon: <LogOut />, label: "Logout" },
];

const SidebarPanel = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <aside className="sidebar-panel bg-base-100 flex flex-col items-center w-16 border-r border-zinc-200 shadow-lg h-screen py-4">
      {sidebarItems.map((item, idx) => (
        <button
          key={item.label}
          className={`btn btn-square mb-2 flex items-center justify-center ${
            activeIdx === idx ? "bg-primary text-primary-content" : ""
          }`}
          aria-label={item.label}
          tabIndex={0}
          onClick={() => setActiveIdx(idx)}
        >
          {item.icon}
        </button>
      ))}
    </aside>
  );
};

export default SidebarPanel;

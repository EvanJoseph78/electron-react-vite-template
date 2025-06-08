import { Sidebar } from "lucide-react";
import React from "react";
import { useSharedState } from "../context/state-context"; 

const Menubar: React.FC = () => {
  const { getState, setState } = useSharedState();
  const isSidebarFixed = getState("side_bar_state");

  const handleClick = () => {
    setState("side_bar_state", !isSidebarFixed);
  };

  return (
    <div className="flex items-center justify-between h-full px-4">
      <div className="flex items-center">
        <button onClick={handleClick} className="p-2 hover:text-primary cursor-pointer">
          <Sidebar className="w-5 h-5" />
        </button>
      </div>
      <div className="flex justify-center">José</div>
      <div className="flex justify-end">User buttons</div>
    </div>
  );
};

export default Menubar;

import React, { useState } from "react";

export type DockButton = {
  label: string;
  icon: React.ReactNode;
};

type DockProps = {
  buttons: DockButton[];
  onSelect?: (index: number) => void;
};

const DockSideBar: React.FC<DockProps> = ({ buttons, onSelect }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    onSelect?.(index);
  };

  return (
    <div
      className={`h-full bg-neutral-800 text-neutral-content flex flex-col 
        py-4 gap-2 transition-all duration-300
        ${isExpanded ? "w-56 p-2" : "w-[56px] p-2"}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="h-10"></div>
      {buttons.map((btn, idx) => (
        <button
          key={btn.label}
          onClick={() => handleClick(idx)}
          className={`flex items-center gap-3 p-2 rounded-full transition w-full hover:cursor-pointer
            ${
              idx === activeIndex
                ? "bg-primary text-primary-content"
                : "hover:bg-primary/70"
            }
          `}
          title={btn.label}
        >
          <div className="text-[1.5em]">{btn.icon}</div>
          {isExpanded && <span className="text-sm">{btn.label} </span>}
        </button>
      ))}
    </div>
  );
};

export default DockSideBar;

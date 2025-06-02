import React, { useState } from "react";
import ButtonNavigation from "./button-navigation";

export type DockButton = {
  label: string;
  icon: React.ReactNode;
  page: React.ReactNode;
};

type DockProps = {
  buttons: DockButton[];
};

const DockSideBar: React.FC<DockProps> = ({ buttons }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div
      className={`h-full bg-neutral-800 text-neutral-content flex flex-col 
        py-4 transition-all duration-300
        ${isExpanded ? "w-56" : "w-[72px]"}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="h-10" />
      {buttons.map((btn, idx) => (
        <ButtonNavigation key={btn.label} page={btn.page}>
          <div
            onClick={() => handleClick(idx)}
            className={`flex items-center gap-3 p-2 rounded-full transition w-full hover:cursor-pointer 
              ${
                idx === activeIndex
                  ? "bg-primary text-primary-content "
                  : "hover:bg-primary/50"
              }
            `}
            title={btn.label}
          >
            <div className="text-[1.5em]">{btn.icon}</div>
            {isExpanded && <span className="text-sm">{btn.label}</span>}
          </div>
        </ButtonNavigation>
      ))}
    </div>
  );
};

export default DockSideBar;

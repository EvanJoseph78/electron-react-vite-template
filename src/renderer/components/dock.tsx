import React, { useState } from "react";

type DockButton = {
  label: string;
  icon: React.ReactNode;
  contentSideBar: React.ReactNode;
  mainContent: React.ReactNode;
};

type DockProps = {
  buttons: DockButton[];
};

const Dock: React.FC<DockProps> = ({ buttons }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex h-full w-full">
      <nav className="flex flex-col bg-base-300 py-2 min-w-[60px] items-center gap-2">
        {buttons.map((btn, idx) => (
          <button
            key={btn.label}
            onClick={() => setActiveIndex(idx)}
            className={`
                            group relative w-10 h-10 flex items-center justify-center rounded-full
                            outline-none border-none cursor-pointer 
                            ${
                              idx === activeIndex
                                ? "bg-primary shadow-lg scale-110"
                                : "bg-transparent hover:bg-primary hover:scale-105"
                            }
                        `}
            title={btn.label}
            type="button"
          >
            <span
              className={`
                                text-2xl
                                ${
                                  idx === activeIndex
                                    ? "text-white"
                                    : "text-neutral-950 group-hover:text-white"
                                }
                            `}
            >
              {btn.icon ? btn.icon : btn.label[0]}
            </span>
          </button>
        ))}
      </nav>
      <main className="flex-1 bg-zinc-500 flex fade-in h-full overscroll-auto" key={activeIndex}>
        {buttons[activeIndex]?.contentSideBar} 
      </main>
    </div>
  );
};

export default Dock;
   


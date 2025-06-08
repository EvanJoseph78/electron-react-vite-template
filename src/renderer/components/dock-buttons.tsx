import React, { useState } from "react";

const DockButtons: React.FC<DockProps> = ({
  buttons,
  initialActiveIndex = 0,
  onChange,
}) => {
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

  const handleClick = (idx: number) => {
    if (activeIndex !== idx) {
      setActiveIndex(idx);
      onChange?.(idx);
    }
  };

  return (
    <div className="flex h-full w-full ">
      <nav className="flex flex-col bg-neutral-800 py-2 w-56 items-center gap-2">
        {/* User Info Section */}
        <div className="flex items-center w-full mb-4 px-2 flex-col ">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-primary ">PDV</h2>
            <span className="block text-xs text-zinc-400 font-medium uppercase tracking-wider">
              Controle de Vendas
            </span>
            <div className="divider divider-primary my-1 "></div>
          </div>
          <img
            src="https://ui-avatars.com/api/?name=Evan+Joseph"
            alt="User avatar"
            className="w-16 h-16 rounded-full border-2 border-primary mr-3"
          />
          <span className="text-base font-semibold text-white">
            Evan Joseph
          </span>
          <span className="text-xs text-zinc-400">evan.joseph@email.com</span>
        </div>

        {buttons.map((btn, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={btn.label}
              onClick={() => handleClick(idx)}
              className={`group relative w-46 h-12 flex items-center justify-start px-4 rounded-xl
                                outline-none border-none cursor-pointer transition-all duration-150
                                ${
                                  isActive
                                    ? "bg-primary shadow-lg scale-105 text-base-100"
                                    : "bg-base-100 hover:bg-primary hover:scale-105"
                                }
                            `}
              title={btn.label}
              type="button"
              aria-pressed={isActive}
              tabIndex={0}
            >
              <span
                className={`text-2xl flex items-center justify-center transition-colors duration-150 mr-3
                                    ${
                                      isActive
                                        ? "text-base-100"
                                        : "text-neutral-900 group-hover:primary"
                                    }
                                `}
              >
                {btn.icon ?? btn.label[0]}
              </span>
              <span
                className={`text-base font-medium text-base-100${
                  isActive
                    ? "text-base-100"
                    : "text-zinc-200 group-hover:primary "
                }`}
              >
                {btn.label}
              </span>
              {/* Indicator */}
              <span
                className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full
                                    transition-opacity duration-200
                                    ${
                                      isActive
                                        ? "bg-neutral-900 opacity-100"
                                        : "opacity-0"
                                    }
                                `}
              />
            </button>
          );
        })}

        {/* Footer Section */}
        <div className="flex w-full justify-center mt-auto pb-4 text-xs text-zinc-400">
          © 2024 Evan Joseph
        </div>
      </nav>
      <main className="bg-base-100 flex-1 fade-in" key={activeIndex}>
        <div className="border h-full w-full">
          {buttons[activeIndex]?.mainContent}
        </div>
      </main>
    </div>
  );
};

export default DockButtons;

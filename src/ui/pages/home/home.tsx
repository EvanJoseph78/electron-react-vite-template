import React, { useState } from "react";
import { Play, Smile, Heart } from "lucide-react";
import UserPage from "../user/userPage";

const tabs = [
  {
    label: "Home",
    icon: <Play className="size-4 me-2" />,
    content: (
      <div className="space-y-2">
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i}>evan {i + 1}</div>
        ))}
      </div>
    ),
  },
  {
    label: "Laugh",
    icon: <Smile className="size-4 me-2" />,
    content: <div>Tab content 2</div>,
  },
  {
    label: "Love",
    icon: <Heart className="size-4 me-2" />,
    content: <UserPage />,
  },
];

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="h-full flex flex-col">
      <div className="tabs tabs-lift">
        {tabs.map((tab, index) => (
          <label
            key={tab.label}
            className={`tab ${activeTab === index ? "tab-active" : ""}`}
          >
            <input
              type="radio"
              name="my_tabs_4"
              checked={activeTab === index}
              onChange={() => setActiveTab(index)}
              className="hidden"
            />
            {tab.icon}
            {tab.label}
          </label>
        ))}
      </div>

      <div className="flex-1 bg-base-100 border-base-300 p-6 overflow-auto">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default HomePage;

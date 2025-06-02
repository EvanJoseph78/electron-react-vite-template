import React, { useState, type ReactNode } from "react";

interface TabItem {
  label: string;
  icon?: ReactNode;
  content: ReactNode;
}

interface TabsLayoutProps {
  tabs: TabItem[];
}

const TabsLayout: React.FC<TabsLayoutProps> = ({ tabs }) => {
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
              name="tabs"
              checked={activeTab === index}
              onChange={() => setActiveTab(index)}
              className="hidden"
            />
            {tab.icon && <span className="me-1">{tab.icon}</span>}
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

export default TabsLayout;

import React from "react";
import SectionCards from "./sections-card";
import { ChartAreaInteractive } from "./chart-area-interactive";

interface DashboardProps { }

const DashboardComponent: React.FC<DashboardProps> = () => {
  return (
    <div className="space-y-4">
      <SectionCards />
      <ChartAreaInteractive />
    </div>
  );
};

export default DashboardComponent;

import React from "react";
import TabsLayout from "../../../../layouts/tabs-layout";
import { LayoutDashboard } from "lucide-react";
import DashboardComponent from "./components/dashboard";

interface Props {}

const HomePage: React.FC<Props> = () => {
  return (
    <TabsLayout
      stateKey="home_tabs" // chave única para o estado global das tabs
      tabs={[
        {
          label: "Dashboard",
          icon: <LayoutDashboard className="size-4 me-2" />,
          content: <DashboardComponent />,
        },
      ]}
    />
  );
};

export default HomePage;

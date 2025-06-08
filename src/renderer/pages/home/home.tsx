import React from "react";
import { Play, Smile, Heart } from "lucide-react";
import UserPage from "../user/userPage";
import TabsLayout from "../../layouts/tabs-layout";
import TabHome from "./components/home-tab-component";

const HomePage: React.FC = () => {
  return (
    <TabsLayout
      stateKey="home_tabs" // chave única para o estado global das tabs
      tabs={[
        {
          label: "Home",
          icon: <Play className="size-4 me-2" />,
          content: <TabHome />,
        },
        {
          label: "Laugh",
          icon: <Smile className="size-4 me-2" />,
          content: <div>Conteúdo da aba Laugh</div>,
        },
        {
          label: "Love",
          icon: <Heart className="size-4 me-2" />,
          content: <UserPage />,
        },
      ]}
    />
  );
};

export default HomePage;

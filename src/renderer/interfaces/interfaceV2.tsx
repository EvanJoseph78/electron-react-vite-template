import { Home, LayoutDashboard, Package, Settings, User } from "lucide-react";
import DockSideBar from "../components/side-bar-dock";
import { useNavigation } from "../context/navigation-context"; 
import HomePage from "../pages/home/home";
import ClientePage from "../pages/clientes/v1/clientePage";
import Menubar from "../components/menu-bar-component";
import { Button } from "../components/ui/button";

const InterfaceV2 = () => {
  const { currentPage } = useNavigation();

  const buttons = [
    {
      label: "Home",
      icon: <Home />,
      page: <HomePage />,
    },
    {
      label: "Clientes",
      icon: <LayoutDashboard />,
      page: <ClientePage />,
    },
    {
      label: "Estoque",
      icon: <Package />,
      page: <div>📦 Página de Estoque</div>,
    },
    {
      label: "Usuários",
      icon: <User />,
      page: <div>👤 Página de Usuários</div>,
    },
    {
      label: "Configurações",
      icon: <Settings />,
      page: (
        <div>
          ⚙️
          <Button variant={"ghost"}>botão</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex h-screen w-full bg-neutral-800">
      <DockSideBar buttons={buttons} />

      <div className="flex-1 flex flex-col bg-base-200 w-full h-full overflow-auto rounded-l-xl">
        <div className="bg-base-100 h-16 border-b border-neutral-200">
          <Menubar />
        </div>
        <div className="h-full w-full overflow-auto">{currentPage}</div>
      </div>
    </div>
  );
};

export default InterfaceV2;

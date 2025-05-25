import { Home, Settings, User } from "lucide-react";
import Dock from "./components/dock";
import DockButtons from "./components/dock-buttons";
import ClientesPage from "./pages/clientes/clientesPage";

function App() {
  return (
    <div className="flex h-screen w-screen" data-theme="latetwist">
      <Dock
        buttons={[
          {
            label: "Home",
            icon: <Home />,
            contentSideBar: (
              <DockButtons
                buttons={[
                  {
                    label: "Dashboard",
                    icon: <User />,
                    mainContent: <div>Informações do perfil do usuário.</div>,
                  },
                  {
                    label: "Clinte",
                    icon: <User />,
                    mainContent: <ClientesPage></ClientesPage>,
                  },
                ]}
              />
            ),
            mainContent: <div>Este é o conteúdo principal da Home.</div>,
          },
          {
            label: "Usuário",
            icon: <User />,
            contentSideBar: (
              <DockButtons
                buttons={[
                  {
                    label: "Perfil",
                    icon: <User />,
                    mainContent: <div>Informações do perfil do usuário.</div>,
                  },
                  {
                    label: "Configurações",
                    icon: <Settings />,
                    mainContent: <div>Configurações do usuário.</div>,
                  },
                ]}
              />
            ),
            mainContent: (
              <div>Selecione uma opção no menu lateral do Usuário.</div>
            ),
          },
          {
            label: "Configurações",
            icon: <Settings />,
            contentSideBar: (
              <DockButtons
                buttons={[
                  {
                    label: "Perfil",
                    icon: <User />,
                    mainContent: <div>Informações do perfil do usuário.</div>,
                  },
                  {
                    label: "Configurações",
                    icon: <Settings />,
                    mainContent: <div>Configurações do usuário.</div>,
                  },
                ]}
              />
            ),
            mainContent: <div>Configurações gerais do sistema.</div>,
          },
        ]}
      />
    </div>
  );
}

export default App;

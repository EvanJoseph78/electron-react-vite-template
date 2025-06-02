import { Home, Inbox, Package, Settings, User } from "lucide-react";
import { useState } from "react";
import DockSideBar from "../../components/side-bar-dock";
import TabsLayout from "../../components/tabs-layout";
import UserPage from "../user/userPage";

const InterfaceV2 = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const buttons = [
    { label: "Home", icon: <Home /> },
    { label: "Inbox", icon: <Inbox /> },
    { label: "Profile", icon: <User /> },
    { label: "Estoque", icon: <Package /> },
    { label: "Settings", icon: <Settings /> },
  ];

  const pages = [
    {
      label: "Dashboard",
      content: (
        <TabsLayout
          tabs={[
            {
              label: "Home",
              icon: <Home className="size-4" />,
              content: (
                <div className="space-y-2">
                  {Array.from({ length: 50 }).map((_, i) => (
                    <div key={i}>Home Item {i + 1}</div>
                  ))}
                </div>
              ),
            },
            {
              label: "Profile",
              icon: <User className="size-4" />,
              content: <UserPage />,
            },
            {
              label: "Inbox",
              icon: <Inbox className="size-4" />,
              content: <div>📥 Inbox Content</div>,
            },
          ]}
        />
      ),
    },
    {
      label: "Inbox",
      content: <div>📥 Página Inbox</div>,
    },
    {
      label: "Profile",
      content: <div>👤 Página Profile</div>,
    },
    {
      label: "Estoque",
      content: <div>Página de estoque</div>,
    },
    {
      label: "Settings",
      content: <div>⚙️ Página Settings</div>,
    },
  ];

  return (
    <div className="flex h-screen w-full bg-neutral-800">
      <DockSideBar buttons={buttons} onSelect={setCurrentPage} />

      <div className="flex-1 flex flex-col bg-base-200 w-full h-full overflow-auto rounded-l-xl">
        <div className="bg-base-100 h-16 p-4 border-b border-neutral-200">
          Menu Bar
        </div>
        <div className="h-full w-full overflow-auto">
          {pages[currentPage].content}
        </div>
      </div>
    </div>
  );
};

export default InterfaceV2;

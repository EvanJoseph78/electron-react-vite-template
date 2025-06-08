import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";
import { AppSidebar } from "./dashboard/components/app-sidebar";

const MainPage = () => {
  return (
    <div className="w-full h-full">
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
        </main>
      </SidebarProvider>
    </div>
  );
};

export default MainPage;

import { Home } from "lucide-react";
import {
  SidebarProvider,
  SidebarTrigger,
} from "../../../components/ui/sidebar";
import { useSharedState } from "../../../context/state-context";
import { AppSidebar, type ItemsProp } from "./dashboard/components/app-sidebar";

const defaultPage: ItemsProp = {
  title: "Home",
  icon: Home,
  content: <>Página Home</>,
};

const MainPage = () => {
  const { getState } = useSharedState();

  const currentPage: ItemsProp = getState("main_page_v3") || defaultPage;

  return (
    <div className="w-full h-full bg-neutral-800">
      <SidebarProvider>
        <AppSidebar />
        <main className="bg-base-100 w-full rounded-l-xl">
          <div className="h-full border-neutral-300 bg-base-100 shadow-xl p-0 rounded-l-xl">
            <div className="border-b border-neutral-300 p-2 flex gap-2 content-center">
              <SidebarTrigger />
              <div>|</div>
              <div>{currentPage.title}</div>
            </div>
            <div className="">{currentPage.content}</div>
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default MainPage;

import { User } from "lucide-react";
import TabsLayout from "../../components/tabs-layout";
import ClientTableList from "./components/clientTableList";

const ClientePage: React.FC = () => {
  const tabs = [
    {
      label: "Clientes",
      icon: <User className="size-4 me-2" />,
      content: <ClientTableList />,
    },
  ];

  return <TabsLayout tabs={tabs}></TabsLayout>;
};
export default ClientePage;

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
    {
      label: "Novo cliente",
      icon: <User className="size-4 me-2" />,
      content: <ClientTableList />,
    },
  ];

  // stateKey preserva o estado do componente quando este é fechado
  return <TabsLayout tabs={tabs} stateKey="cliente_tab"></TabsLayout>;
};
export default ClientePage;

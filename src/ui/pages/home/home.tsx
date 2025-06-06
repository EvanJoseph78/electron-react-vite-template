import React from "react";
import { Play, Smile, Heart } from "lucide-react";
import UserPage from "../user/userPage";
import FormLayout from "../../components/form-layout";
import ModalLayout from "../../components/modal-layout";
import ClientForm from "../../components/forms/client-form";
import TabsLayout from "../../components/tabs-layout";
import toast from "react-hot-toast";

const HomePage: React.FC = () => {
  return (
    <TabsLayout
      stateKey="home_tabs" // chave única para o estado global das tabs
      tabs={[
        {
          label: "Home",
          icon: <Play className="size-4 me-2" />,
          content: (
            <div className="flex flex-col gap-4">
              <FormLayout />
              <ModalLayout modalName="Cliente" stateKey="cliente_modal">
                <ClientForm
                  onSubmit={() => {
                    toast.success("Cliente salvo com sucesso!");
                  }}
                />
              </ModalLayout>
            </div>
          ),
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

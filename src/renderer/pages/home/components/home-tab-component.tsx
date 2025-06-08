import React from "react";
import FormLayout from "../../../layouts/form-layout";
import ModalLayout from "../../../layouts/modal-layout";
import toast from "react-hot-toast";
import ClientForm from "../../../components/forms/client-form";
import { ClienteForm } from "../../clientes/clientForm";

const TabHome: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <FormLayout />
      <ModalLayout modalName="Cliente" stateKey="cliente_modal">
        <ClientForm
          onSubmit={() => {
            toast.success("Cliente salvo com sucesso!");
          }}
        />
      </ModalLayout>
      <ClienteForm />
    </div>
  );
};

export default TabHome;

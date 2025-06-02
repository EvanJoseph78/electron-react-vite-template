import { useEffect, useState } from "react";
import DynamicTable from "../../../components/table";
// import { Component } from "lucide-react";
import ClientFormModal from "./clientFormModal";

const ClientTableList: React.FC = () => {
  // Função para buscar clientes do backend
  const [clientList, setClientList] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchClientes = async () => {
    setIsLoading(true);

    try {
      const clientes = await window.electron.cliente.getAll();
      setClientList(clientes);
      console.log("Clientes recebidos:", clientes);
    } catch (error) {
      console.error("Erro ao listar clientes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = () => {
    console.log("Abrir modal de cadastro");
    // Lógica para abrir um modal ou navegar para uma página de criação.
  };

  // Buscar clientes ao montar o componente
  useEffect(() => {
    fetchClientes();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  } else {
    return (
      <>
        <DynamicTable
          columns={["id", "nome", "email", "telefone"]}
          data={clientList}
          onCreate={handleCreate}
          sortableColumns={["id", "nome", "email", "telefone"]}
          editButtons
          deleteButtons
          createBtn={
            <ClientFormModal
              onSubmit={async (
                _data: { name: string; email: string; phone: string },
                _event?: React.BaseSyntheticEvent
              ) => {
                // Aqui você pode chamar a função para adicionar cliente no banco
                // await window.electron.cliente.add(data);
                await fetchClientes(); // Atualiza a lista após adicionar
              }}
            ></ClientFormModal>
          }
        ></DynamicTable>
      </>
    );
  }
};

export default ClientTableList;

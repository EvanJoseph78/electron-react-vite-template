import React, { useEffect, useState } from "react";
import ClientFormModal from "./components/clientFormModal";

const PAGE_SIZE = 5;

const ClientesPage: React.FC = () => {
  const [clientList, setClientList] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Função para editar cliente
  const handleEdit = (clienteId: number) => {
    alert(`Editar cliente com ID: ${clienteId}`);
  };

  // Função para buscar clientes do backend
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

  // Buscar clientes ao montar o componente
  useEffect(() => {
    fetchClientes();
  }, []);

  const totalPages = Math.ceil(clientList.length / PAGE_SIZE);

  // Clientes da página atual
  const clientesPagina = clientList.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Clientes</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Telefone</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientesPagina.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nome}</td>
                <td>{cliente.telefone}</td>
                <td>{cliente.email}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleEdit(cliente.id!)}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4 gap-2">
            <button
              className="btn btn-sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Anterior
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                className={`btn btn-sm ${
                  currentPage === idx + 1 ? "btn-active" : ""
                }`}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
            <button
              className="btn btn-sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Próxima
            </button>
          </div>
        )}

        <div className="divider"></div>
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
      </div>
    </div>
  );
};

export default ClientesPage;

import React, { useState } from "react";
import ClientFormModal from "./components/clientFormModal";

// Exemplo de dados de clientes
const clientes = [
  {
    id: 1,
    nome: "Ana Souza",
    email: "ana.souza@email.com",
    telefone: "(11) 91234-5678",
  },
  {
    id: 2,
    nome: "Bruno Lima",
    email: "bruno.lima@email.com",
    telefone: "(21) 99876-5432",
  },
];

// Função para editar cliente
const handleEdit = (clienteId: number) => {
  alert(`Editar cliente com ID: ${clienteId}`);
};

// Função para adicionar cliente
const handleAddClient = (client: any) => {
  clientes.push({
    id: clientes.length > 0 ? clientes[clientes.length - 1].id + 1 : 1,
    ...client,
  });
};

// Função para atualizar cliente
const handleUpdateClient = (clienteId: number, updatedData: any) => {
  const idx = clientes.findIndex((c) => c.id === clienteId);
  if (idx !== -1) {
    clientes[idx] = { ...clientes[idx], ...updatedData };
  }
};

const PAGE_SIZE = 5;

const ClientesPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(clientes.length / PAGE_SIZE);

  // Clientes da página atual
  const clientesPagina = clientes.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Clientes</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientesPagina.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nome}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefone}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleEdit(cliente.id)}
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
          onSubmit={function (
            _data: { name: string; email: string; phone: string },
            _event?: React.BaseSyntheticEvent
          ): unknown | Promise<unknown> {
            throw new Error("Function not implemented.");
          }}
        ></ClientFormModal>
      </div>
    </div>
  );
};

export default ClientesPage;

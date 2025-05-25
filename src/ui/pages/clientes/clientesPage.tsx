import React, { useState } from "react";

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

const handleEdit = (clienteId: number) => {
  alert(`Editar cliente com ID: ${clienteId}`);
};

const handleAddClient = (client: any) => {
  clientes.push({
    id: clientes.length > 0 ? clientes[clientes.length - 1].id + 1 : 1,
    ...client,
  });
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

  // Atualiza a tabela ao adicionar cliente
  const [_, forceUpdate] = useState({});
  const handleAddClientAndUpdate = (client: any) => {
    handleAddClient(client);
    forceUpdate({});
  };

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

        {/* Botão para abrir o modal */}
        <div className="flex justify-end mt-4">
          <button
            className="btn btn-primary"
            onClick={() =>
              (
                document.getElementById(
                  "add-cliente-modal"
                ) as HTMLDialogElement
              )?.showModal()
            }
          >
            Adicionar Cliente
          </button>
        </div>

        {/* Modal DaisyUI */}
        <dialog id="add-cliente-modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Adicionar Cliente</h3>
            <form method="dialog" className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Nome"
                className="input input-bordered w-full"
              />
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full"
              />
              <input
                type="tel"
                placeholder="Telefone"
                className="input input-bordered w-full"
              />
              <div className="modal-action">
                <button className="btn">Cancelar</button>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => {
                    const form = document.querySelector(
                      "#add-cliente-modal form"
                    ) as HTMLFormElement;
                    const nome = (form.elements[0] as HTMLInputElement).value;
                    const email = (form.elements[1] as HTMLInputElement).value;
                    const telefone = (form.elements[2] as HTMLInputElement)
                      .value;
                    handleAddClientAndUpdate({ nome, email, telefone });
                    (form.elements[0] as HTMLInputElement).value = "";
                    (form.elements[1] as HTMLInputElement).value = "";
                    (form.elements[2] as HTMLInputElement).value = "";
                    (
                      document.getElementById(
                        "add-cliente-modal"
                      ) as HTMLDialogElement
                    )?.close();
                  }}
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </dialog>
        <div className="divider"></div>
      </div>
    </div>
  );
};

export default ClientesPage;

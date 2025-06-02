import DynamicTable from "../../components/table";

const UserPage = () => {
  const columns = ["id", "nome", "email", "cargo"];

  const data = [
    { id: 1, nome: "João Silva", email: "joao@email.com", cargo: "Admin" },
    { id: 2, nome: "Maria Oliveira", email: "maria@email.com", cargo: "User" },
    { id: 2, nome: "Evandro Mariano", email: "maria@email.com", cargo: "User" },
    {
      id: 3,
      nome: "Carlos Souza",
      email: "carlos@email.com",
      cargo: "Manager",
    },
    { id: 4, nome: "Evandro Mariano", email: "maria@email.com", cargo: "User" },
    { id: 4, nome: "Evandro Mariano", email: "maria@email.com", cargo: "User" },
    { id: 4, nome: "Evandro Mariano", email: "maria@email.com", cargo: "User" },
    { id: 4, nome: "Evandro Mariano", email: "maria@email.com", cargo: "User" },
    { id: 4, nome: "Evandro Mariano", email: "maria@email.com", cargo: "User" },
    { id: 4, nome: "Evandro Mariano", email: "maria@email.com", cargo: "User" },
    { id: 4, nome: "Evandro Mariano", email: "maria@email.com", cargo: "User" },
    { id: 4, nome: "Evandro Mariano", email: "maria@email.com", cargo: "User" },
  ];

  const handleEdit = (row: any) => {
    console.log("Editar:", row);
    // Aqui você pode abrir um modal, navegar para outra página, etc.
  };

  const handleDelete = (row: any) => {
    console.log("Excluir:", row);
    // Aqui você pode abrir um modal de confirmação ou executar a exclusão.
  };

  const handleCreate = () => {
    console.log("Abrir modal de cadastro");
    // Lógica para abrir um modal ou navegar para uma página de criação.
  };

  const handleRefresh = () => {
    console.log("Atualizar dados");
    // Aqui você pode recarregar os dados da API, por exemplo.
  };

  return (
    <div className="p-6 space-y-6 card-body border rounded-xl border-neutral-300 shadow-md h-full">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Usuários</h1>
      </div>

      <DynamicTable
        columns={columns}
        data={data}
        editButtons
        deleteButtons
        sortableColumns={["nome", "id", "email", "cargo"]}
        onCreate={handleCreate}
        onRefresh={handleRefresh}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default UserPage;

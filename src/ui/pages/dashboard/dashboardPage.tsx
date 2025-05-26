const stats = [
  { label: "Usuários", value: 1200, icon: "👤" },
  { label: "Vendas", value: 350, icon: "💰" },
  { label: "Visitantes", value: 4800, icon: "👀" },
  { label: "Tickets", value: 87, icon: "🎫" },
];

const DashboardPage: React.FC = () => {
  return (
    <div className="p-8 bg-base-200 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="stats shadow">
            <div className="stat">
              <div className="stat-figure text-primary text-3xl">
                {stat.icon}
              </div>
              <div className="stat-title">{stat.label}</div>
              <div className="stat-value">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Bem-vindo ao painel!</h2>
          <p>
            Aqui você pode acompanhar as principais métricas do sistema. Use o
            menu lateral para navegar entre as funcionalidades.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowDownCircle,
  Home,
  LayoutDashboardIcon,
  Plus,
  Store,
  Truck,
  User,
} from "lucide-react";

// -------------------- Sidebar Items Definition --------------------
const sidebarItems: SidebarItems = [
  {
    icon: <Home />,
    label: "Home",
    route: "/",
    tolip: "Home",
    buttons: [
      {
        label: "Dashboard",
        route: "/dashboard",
        icon: <LayoutDashboardIcon />,
      },
      { label: "Clientes", route: "/clientes", icon: <User /> },
      { label: "Fornecedores", route: "/finaceiro", icon: <Truck /> },
      {
        label: "Despesas",
        route: "/estoque",
        icon: <ArrowDownCircle />,
      },
    ],
  },
  {
    icon: <Store />,
    label: "Estoque",
    route: "/clientes",
    tolip: "Estoque",
    buttons: [
      { label: "Movimentar", route: "/estoque/produtos", icon: <Store /> },
      { label: "Cadastrar", route: "/estoque/entradas" },
      { label: "Relatórios", route: "/estoque/saidas" },
      { label: "Estoque geral", route: "/estoque/saidas" },
      { label: "Movimento Produto", route: "/estoque/saidas" },
    ],
  },
  {
    icon: <Plus />,
    label: "Cadastro",
    route: "/",
    tolip: "Cadastro",
    buttons: [
      { label: "Clientes", route: "/dashboard" },
      { label: "Fornecedores", route: "/cadastron" },
      { label: "Contas de despesas", route: "/finaceiro" },
      { label: "Contas de receitas", route: "/estoque" },
      { label: "Caixa ou banco", route: "/estoque" },
      { label: "Formas de pagamento", route: "/estoque" },
    ],
  },
];

// -------------------- SidebarPanel Component --------------------
const SidebarPanel = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="flex flex-row w-74 bg-neutral text-base-100 h-full">
      {/* -------------------- Sidebar -------------------- */}
      <aside className="sidebar-panel bg-base-100 flex flex-col items-center w-16 border-r border-zinc-200 shadow-lg h-full py-2">
        {/* App Icon Section */}
        <div className="flex items-center justify-center w-full">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-md">
            {/* Substitua pelo ícone do seu app */}
            <span className="text-2xl text-white font-bold">7</span>
          </div>
        </div>
        <div className="divider divider-zinc-700 my-1"></div>
        {/* Sidebar Navigation Buttons */}
        <div className="flex flex-col gap-3 w-full mt-4">
          {sidebarItems.map((item, idx) => (
            <button
              key={item.label}
              data-tip={item.tolip}
              data-tip-id={item.tolip}
              className={`btn btn-square w-11 h-11 rounded-full mx-auto flex items-center justify-center transition-all duration-200 
          ${
            activeIdx === idx
              ? "bg-primary text-primary-content shadow-lg scale-105"
              : "hover:bg-zinc-100"
          }
          `}
              aria-label={item.label}
              tabIndex={0}
              onClick={() => {
                setActiveIdx(idx);
                navigate(item.route);
              }}
            >
              {item.icon}
            </button>
          ))}
        </div>
      </aside>

      {/* -------------------- Main Panel -------------------- */}
      <div className="flex flex-col flex-1 p-2 pt-1 gap-2 justify-start items-start bg-neutral-800">
        {/* User Info Section */}
        <div className="flex items-center w-full mb-4 px-2 flex-col ">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-primary ">PDV</h2>
            <span className="block text-xs text-zinc-400 font-medium uppercase tracking-wider">
              Controle de Vendas
            </span>
            <div className="divider divider-primary my-1 "></div>
          </div>
          <img
            src="https://ui-avatars.com/api/?name=Evan+Joseph"
            alt="User avatar"
            className="w-16 h-16 rounded-full border-2 border-primary mr-3"
          />
          <span className="text-base font-semibold text-white">
            Evan Joseph
          </span>
          <span className="text-xs text-zinc-400">evan.joseph@email.com</span>
        </div>

        {/* Submenu Buttons Section */}
        {sidebarItems[activeIdx]?.buttons?.map((button) => (
          <button
            key={button.label}
            className={`btn btn-outline btn-md w-full text-left flex justify-start
          ${
            window.location.pathname === button.route
              ? "bg-primary btn-primary text-primary-content"
              : "bg-white text-black"
          }
        `}
            onClick={() => navigate(button.route)}
          >
            {button.icon && <span className="mr-2">{button.icon}</span>}
            {button.label}
          </button>
        ))}

        {/* Footer Section */}
        <div className="flex w-full justify-center mt-auto pb-4 text-xs text-zinc-400">
          © 2024 Evan Joseph
        </div>
      </div>
    </div>
  );
};

export default SidebarPanel;

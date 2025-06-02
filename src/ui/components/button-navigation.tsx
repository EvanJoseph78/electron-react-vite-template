import type { ReactNode } from "react";
import { useNavigation } from "../pages/context/navigation-context";

type RouteButton = {
  page: ReactNode;
  children: ReactNode; // Permite passar texto, ícone ou ambos dentro do botão
};

const ButtonNavigation: React.FC<RouteButton> = ({ page, children }) => {
  const { setPage } = useNavigation();

  return (
    <button
      onClick={() => setPage(page)}
      className="px-4 py-2 rounded"
    >
      {children}
    </button>
  );
};

export default ButtonNavigation;

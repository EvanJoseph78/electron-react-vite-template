import { createContext, useContext, useState, type ReactNode } from "react";
import HomePage from "../home/home";

interface NavigationContextType {
  currentPage: ReactNode;
  setPage: (page: ReactNode) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [currentPage, setCurrentPage] = useState<ReactNode>(
    <HomePage></HomePage>
  );

  const setPage = (page: ReactNode) => {
    setCurrentPage(page);
  };

  return (
    <NavigationContext.Provider value={{ currentPage, setPage }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error(
      "useNavigation deve ser usado dentro de um NavigationProvider"
    );
  }
  return context;
};

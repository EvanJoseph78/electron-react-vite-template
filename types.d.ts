// =====================
// Database Models
// =====================

type Client = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
};

type User = {
  nome: string;
  idade: number;
  profissao: string;
  favoriteColor?: string;
};

// =====================
// JSX Element Types
// =====================

type DockButton = {
  label: string;
  icon?: React.ReactNode;
  mainContent?: React.ReactNode;
};

type DockProps = {
  buttons: DockButton[];
  initialActiveIndex?: number;
  onChange?: (index: number) => void;
};

type DockConfigItem = {
  label: string;
  icon: JSX.Element;
  contentSideBar: JSX.Element;
  mainContent: JSX.Element;
};

type DockConfig = DockConfigItem[];

// =====================
// Window Interface
// =====================

interface Window {
  electron: {
    user: {
      getAll: () => Promise<User[]>;
      create: (user: User) => Promise<User>;
    };
    cliente: {
      getAll: () => Promise<Client[]>;
      create: (cliente: Client) => Promise<Client>;
      update: (id: number, cliente: Client) => Promise<Client>;
      delete: (id: number) => Promise<void>;
    };
  };
}

type User = {
  nome: string;
  idade: number;
  profissao: string;
  favoriteColor?: string;
};

interface Window {
  electron: {
    generateRandomString: () => Promise<string>;
    subscribeStatistic: (callback: (statistics: any) => void) => void;
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

// Define the structure of the client data
type Client = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
};  

type DockButton = {
  label: string;
  icon: React.ReactNode;
  contentSideBar: React.ReactNode;
  mainContent: React.ReactNode;
  sideContent?: {
    btnName: string;
    content: React.ReactNode;
  }[];
};

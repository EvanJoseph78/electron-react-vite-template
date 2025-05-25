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
  };
}

type SidebarItem = {
  icon: React.ReactNode;
  label: string;
  route: string;
  tolip: string;
  buttons?: {
    label: string;
    route: string;
    icon?: React.ReactNode;
  }[];
};

type SidebarItems = SidebarItem[];
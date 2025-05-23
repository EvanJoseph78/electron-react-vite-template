type User = {
  nome: string;
  idade: number;
  profissao: string;
};

interface Window {
  electron: {
    generateRandomString: () => Promise<string>;
    subscribeStatistic: (callback: (statistics: any) => void) => void;
    getUserList: () => Promise<User[]>;
    createUser: (user: User) => Promise<User>;
  };
}

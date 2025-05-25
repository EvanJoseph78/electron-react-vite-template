import { useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
import "./App.css";
import Menubar from "./components/menubar";
import Tabs from "./components/tabs";

function App() {
  const [count, setCount] = useState(0);

  const [randomString, setRandomString] = useState("");

  useEffect(() => {
    // Escutando o evento de string aleatória
    // @ts-ignore
    window.electron.subscribeStatistic((data) => {
      setRandomString(data);
    });

    // Buscando a lista de usuários
    const fetchUsers = async () => {
      const users = await window.electron.user.getAll();
      console.log(users);
    };

    // função para criar um usuário
    const createNewUser = async () => {
      const user = {
        nome: "Evan Joseph",
        idade: 25,
        profissao: "Developer",
        favoriteColor: "Orange",
      };
      const newUser = await window.electron.user.create(user);
      console.log(newUser);
    };

    createNewUser();

    fetchUsers();
  }, []);

  return (
    <div>
      <Menubar></Menubar>
      {/* <Tabs></Tabs> */}
    </div>
  );
}

export default App;

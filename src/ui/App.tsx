import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

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
        nome: "Evandro Mariano",
        idade: 25,
        profissao: "Programador",
        favoriteColor: "blue",
      };
      const newUser = await window.electron.user.create(user);
      console.log(newUser);
    };

    createNewUser();

    fetchUsers();
  }, []);

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div>
        <h2>Random String from Electron:</h2>
        <p>{randomString}</p>
      </div>
    </>
  );
}

export default App;

import { Toaster } from "react-hot-toast";
import { NavigationProvider } from "./context/navigation-context";
import InterfaceV1 from "./interfaces/interfaceV1";
import InterfaceV2 from "./interfaces/interfaceV2";
import { StateProvider } from "./context/state-context";
import MainPage from "./app/V3/main/MainPage";

const uiOption = [<InterfaceV1 />, <InterfaceV2 />, <MainPage />];

function App() {
  return (
    <div className="flex h-screen w-screen" data-theme="latetwist">
      <StateProvider>
        <NavigationProvider>{uiOption[2]}</NavigationProvider>
      </StateProvider>
      <Toaster />
    </div>
  );
}

export default App;

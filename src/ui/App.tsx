import { NavigationProvider } from "./pages/context/navigation-context";
import InterfaceV1 from "./pages/interfaces/interfaceV1";
import InterfaceV2 from "./pages/interfaces/interfaceV2";

const uiOption = [<InterfaceV1 />, <InterfaceV2 />];

function App() {
  return (
    <div className="flex h-screen w-screen" data-theme="latetwist">
      <NavigationProvider>{uiOption[1]}</NavigationProvider>
    </div>
  );
}

export default App;

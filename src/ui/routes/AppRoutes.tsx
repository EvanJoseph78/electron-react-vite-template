import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/home";
import ClientesPage from "../pages/clientes/clientesPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<div>About Page</div>} />
      <Route path="/settings" element={<div>Settings Page</div>} />
      <Route path="/user" element={<div>User Page</div>} />
      <Route path="/clientes" element={<ClientesPage />} />

      {/* 404 */}
      <Route path="*" element={<div>Página não encontrada</div>} />
    </Routes>
  );
}

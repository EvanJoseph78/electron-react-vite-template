import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/home";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<div>About Page</div>} />
      <Route path="/settings" element={<div>Settings Page</div>} />
      <Route path="/user" element={<div>User Page</div>} />

      {/* 404 */}
      <Route path="*" element={<div>Página não encontrada</div>} />
    </Routes>
  );
}

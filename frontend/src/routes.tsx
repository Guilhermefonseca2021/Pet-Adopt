import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Profile from "./pages/Profile";
import Adopt from "./pages/Adopt";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/adopt/:id" element={<Adopt />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user/profile/:id" element={<Profile />} />
    </Routes>
  );
}

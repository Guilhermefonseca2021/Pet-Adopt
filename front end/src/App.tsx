import "./App.css";
import Layout from "./components/layout/Layout";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}

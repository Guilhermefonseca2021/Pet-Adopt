import Router from "../../routes";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

export default function Layout() {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen flex justify-center rounded-lg shadow p-2 bg-white relative overflow-hidden">
        <Router />
      </main>
      <Footer />
    </div>
  );
}

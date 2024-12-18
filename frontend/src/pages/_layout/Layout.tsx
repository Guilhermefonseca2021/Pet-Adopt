import Router from "../../routes";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

export default function Layout() {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen flex justify-center items-center rounded-lg shadow p-6 bg-white relative overflow-hidden">
        <Router />
      </main>
      <Footer />
    </div>
  );
}

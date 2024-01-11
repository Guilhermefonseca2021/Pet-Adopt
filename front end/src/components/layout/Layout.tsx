import Router from "../../routes";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import "./layout.css";

export default function Layout() {
  return (
    <div className="layout-styles">
      <Navbar />

      <main className="container">
        <Router />
      </main>
      <Footer />
    </div>
  );
}

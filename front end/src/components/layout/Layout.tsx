import Router from "../../routes";
import Footer from "../footer/Footer";
import Message from "../messages/Message";
import Navbar from "../navbar/Navbar";
import "./layout.css";

export default function Layout() {
  return (
    <div className="layout-styles">
      <Navbar />
      <div className="message">
        <Message />
      </div>
      <main className="container">
        <Router />
      </main>
      <Footer />
    </div>
  );
}

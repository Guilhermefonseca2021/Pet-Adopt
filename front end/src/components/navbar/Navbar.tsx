import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div>
        <NavLink to="/">
          <img src={logo} alt="" />
        </NavLink>
      </div>
      <ul>
        <li>
          <NavLink to="/"> Adotar </NavLink>
        </li>
        <li>
          <NavLink to="/login"> Entrar </NavLink>
        </li>
        <li>
          <NavLink to="/register"> Cadastrar </NavLink>
        </li>
      </ul>
    </nav>
  );
}

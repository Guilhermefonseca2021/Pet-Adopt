import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Icon from '../../public/favicon.ico'

export default function Navbar() {
  const auth = useContext(AuthContext);
  function logout() {}

  return (
    <header className="lg:px-16 px-4 bg-white flex flex-wrap items-center py-4 shadow-md">
      <div className="flex-1 flex items-center gap-2">
        <img src={Icon} alt="" width={22} />
        <NavLink to="/" className="text-xl font-light">
          PetShop
        </NavLink>
      </div>

      <label htmlFor="menu-toggle" className="pointer-cursor md:hidden block">
        <svg
          className="fill-current text-gray-900"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <title>menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        </svg>
      </label>
      <input className="hidden" type="checkbox" id="menu-toggle" />

      <div
        className="hidden md:flex md:items-center md:w-auto w-full"
        id="menu"
      >
        <nav>
          <ul className="md:flex items-center gap-2 justify-between text-gray-700 pt-4 md:pt-0">
            <li>
              <NavLink to="/about" className="text-md hover:text-blue-700 transition-all">
                Sobre
              </NavLink>
            </li>
            <li>
              <NavLink to="/cares" className="text-md hover:text-blue-700 transition-all">
                Tratamentos
              </NavLink>
            </li>
            {auth.user ? (
              <>
                <li>
                  <NavLink to="/user/profile" className="text-md hover:text-blue-700 transition-all"> Perfil </NavLink>
                </li>
                <li onClick={logout}>Sair</li>
              </>
            ) : (
              <>
                <li>
                    <NavLink to="/login" className="text-md hover:text-blue-700 transition-all"> Login </NavLink>
                </li>
                <li>
                  <NavLink to="/register" className="text-md hover:text-blue-700 transition-all"> Cadastrar </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

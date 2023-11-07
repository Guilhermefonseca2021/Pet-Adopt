import { NavLink } from "react-router-dom";
import './styles.css';
import { FaFilm, FaSearch,  } from 'react-icons/fa';

export default function Header() {
  return (
    <>
      <div className="navbar">
        <h2>
          <NavLink to="/" className="logo">Movie DB<FaFilm /> </NavLink>
        </h2> 
        <form>
          <input type="text" />        
          <button type="submit"><FaSearch /></button>
        </form>
      </div>
    </>
  );
}

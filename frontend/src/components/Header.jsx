import { NavLink } from 'react-router-dom';
import '../styles/components/header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="logo">IWB <br />
            Electronic Recycling
      </div>
      <nav>
        <ul className="nav-links">
          <li>
            <NavLink 
              to="/" 
              end
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/products"
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/about"
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/contact"
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              Contact
            </NavLink>
          </li>
          <li>
            <a href="/login" className="login-btn">Sign In</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
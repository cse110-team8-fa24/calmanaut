import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { AuthorizationContext } from '../context/AuthorizationContext';

const Navbar: React.FC = () => {
  const { isLoggedIn, id } = useContext(AuthorizationContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    
  };

  const closeMenu = () => {
    setIsMenuOpen(false); // Close the menu when a link is clicked
  };

  return (
    <nav className="navbar">
      <h2 className="navbar-title">Calmanaut</h2>
      <button
        className="navbar-toggle"
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
        aria-label="Toggle navigation menu"
      >
        ☰
      </button>
      <ul className={`nav-links ${isMenuOpen ? 'show' : ''}`}>
        <li>
          <Link to="/about" onClick={closeMenu}>
            About
          </Link>
        </li>
        <li>
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/resources" onClick={closeMenu}>
            Resources
          </Link>
        </li>
        {isLoggedIn && (
          <>
            <li>
              <Link to="/progress" onClick={closeMenu}>
                Progress Tracker
              </Link>
            </li>
            <li>
              <Link to={`/profile/${id}`} onClick={closeMenu}>
                Profile
              </Link>
            </li>
          </>
        )}
        <li>
          {isLoggedIn ? (
            <Link to="/logout" onClick={closeMenu}>
              Log Out
            </Link>
          ) : (
            <Link to="/signup" onClick={closeMenu}>
              Sign Up
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

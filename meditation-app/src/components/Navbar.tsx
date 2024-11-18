import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { AuthorizationContext } from '../context/AuthorizationContext';

const Navbar: React.FC = () => {
  const {isLoggedIn, id} = useContext(AuthorizationContext);

  const progressTracker = isLoggedIn
    ? <li><Link to="/progress">Progress Tracker</Link></li>
    : <></>;

  const profile = isLoggedIn
    ? <li><Link to={"/profile/" + id}>Profile</Link></li>
    : <></>;

  const signup = isLoggedIn
    ? <li><Link to="/logout">Log Out</Link></li>
    : <li><Link to="/signup">Sign Up</Link></li>;

  return (
    <nav className="navbar">
      <h2>Calmanaut</h2>
      <ul className="nav-links">
        <li><Link to="/about">About</Link></li> 
        <li><Link to="/">Home</Link></li>
        <li><Link to="/resources">Resources</Link></li>
        
        {progressTracker}
        {profile}
        {signup}
      </ul>
    </nav>
  );
};

export default Navbar;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="navbar-logo">AgroPanel</div>
      
      <div className={`navbar-menu ${isOpen ? 'open' : ''}`}>
        <Link to="/" onClick={() => setIsOpen(false)}>Dashboard</Link>
        <Link to="/fields" onClick={() => setIsOpen(false)}>Parcele</Link>
    
        <Link to="/productions" onClick={() => setIsOpen(false)}>Proizvodnje</Link>
        <Link to="/expenses" onClick={() => setIsOpen(false)}>Troškovi</Link>
        <Link to="/reports" onClick={() => setIsOpen(false)}>Izveštaji</Link>
        <Link to="/notifications" onClick={() => setIsOpen(false)}>Obaveštenja</Link>
         <Link to="/Login" onClick={() => setIsOpen(false)}>Login</Link>
           <Link to="/register" onClick={() => setIsOpen(false)}>Registruj</Link>
      
      </div>

      {/* Burger na desnoj strani */}
      <div className="burger" onClick={toggleMenu}>
        <span className={`line ${isOpen ? 'rotate1' : ''}`}></span>
        <span className={`line ${isOpen ? 'fade' : ''}`}></span>
        <span className={`line ${isOpen ? 'rotate2' : ''}`}></span>
      </div>
    </nav>
  );
}

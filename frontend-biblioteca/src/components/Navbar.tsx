// src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav style={{ backgroundColor: '#333', padding: '1rem' }}>
      <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', margin: 0 }}>
        <li><Link to="/usuarios" style={{ color: '#fff', textDecoration: 'none' }}>Usuarios</Link></li>
        <li><Link to="/libros" style={{ color: '#fff', textDecoration: 'none' }}>Libros</Link></li>
        <li><Link to="/prestamos" style={{ color: '#fff', textDecoration: 'none' }}>Préstamos</Link></li>
        <li><Link to="/prestar" style={{ color: '#fff', textDecoration: 'none' }}>Prestar</Link></li>
        <li><Link to="/devolver" style={{ color: '#fff', textDecoration: 'none' }}>Devolver</Link></li>
        
      </ul>
    </nav>
  );
};

export default Navbar;

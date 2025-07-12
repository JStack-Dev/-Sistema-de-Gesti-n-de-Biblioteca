// src/App.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Usuarios from './pages/Usuario';
import Libros from './pages/Libros';
import Prestamos from './pages/Prestamos';
import PrestarLibro from './pages/PrestarLibro';
import DevolverLibro from './pages/DevolverLibro';
import AgregarLibro from './pages/AgregarLibro';

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h1>📖 Sistema de Biblioteca</h1>
        <Routes>
          <Route path="/" element={<Navigate to="/usuarios" />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/libros" element={<Libros />} />
          <Route path="/prestamos" element={<Prestamos />} />
          <Route path="/prestar" element={<PrestarLibro />} />
          <Route path="/devolver" element={<DevolverLibro />} />
        </Routes>
      </div>
    </>
  );
};

export default App;

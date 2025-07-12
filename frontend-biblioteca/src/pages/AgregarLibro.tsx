// src/pages/AgregarLibro.tsx
import React, { useState } from 'react';

const AgregarLibros: React.FC = () => {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [añoPublicacion, setAñoPublicacion] = useState<number>(2024);
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje('');

    try {
      const response = await fetch('http://localhost:3000/api/libros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo,
          autor,
          año_publicacion: añoPublicacion,
        }),
      });

      if (!response.ok) throw new Error('No se pudo añadir el libro');
      setMensaje('✅ Libro añadido con éxito');
      setTitulo('');
      setAutor('');
      setAñoPublicacion(2024);
    } catch (error) {
      console.error(error);
      setMensaje('❌ Error al añadir el libro');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>➕ Añadir nuevo libro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label><br />
          <input value={titulo} onChange={e => setTitulo(e.target.value)} required />
        </div>
        <div>
          <label>Autor:</label><br />
          <input value={autor} onChange={e => setAutor(e.target.value)} required />
        </div>
        <div>
          <label>Año de publicación:</label><br />
          <input
            type="number"
            value={añoPublicacion}
            onChange={e => setAñoPublicacion(Number(e.target.value))}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>Guardar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default AgregarLibros;

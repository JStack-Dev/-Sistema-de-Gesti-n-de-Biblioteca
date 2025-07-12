import React, { useEffect, useState } from 'react';

interface Libro {
  id: number;
  titulo: string;
  autor: string;
  año_publicacion: number;
  disponible: boolean;
}

const Libros: React.FC = () => {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Formulario
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [añoPublicacion, setAñoPublicacion] = useState<number>(2024);
  const [mensaje, setMensaje] = useState('');

  const fetchLibros = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/libros');
      if (!response.ok) throw new Error('Error al obtener los libros');
      const data: Libro[] = await response.json();
      setLibros(data);
    } catch {
      setError('No se pudieron cargar los libros.');
    }
  };

  useEffect(() => {
    fetchLibros();
  }, []);

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
      fetchLibros(); // Recargar lista
    } catch (error) {
      console.error(error);
      setMensaje('❌ Error al añadir el libro');
    }
  };

  const handleDelete = async (id: number) => {
    const confirmar = window.confirm('¿Seguro que quieres eliminar este libro?');
    if (!confirmar) return;

    try {
      const response = await fetch(`http://localhost:3000/api/libros/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('No se pudo eliminar');
      setMensaje('✅ Libro eliminado con éxito');
      fetchLibros(); // Recargar lista
    } catch (error) {
      console.error(error);
      setMensaje('❌ Error al eliminar el libro');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>📚 Lista de libros</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {libros.length > 0 ? (
        <ul>
          {libros.map(libro => (
            <li key={libro.id}>
              <strong>{libro.titulo}</strong> – {libro.autor} ({libro.año_publicacion}){' '}
              {libro.disponible ? '✅ Disponible' : '❌ Prestado'}
              <button
                onClick={() => handleDelete(libro.id)}
                style={{ marginLeft: '1rem', color: 'red' }}
              >
                🗑 Eliminar
              </button>
            </li>
          ))}
        </ul>
      ) : !error ? (
        <p>Cargando libros...</p>
      ) : null}

      <hr style={{ margin: '2rem 0' }} />

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

export default Libros;

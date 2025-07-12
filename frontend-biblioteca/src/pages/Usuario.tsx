// src/pages/Usuarios.tsx
import React, { useEffect, useState } from 'react';

interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

const Usuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Formulario
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  const fetchUsuarios = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/usuarios');
      if (!response.ok) throw new Error('Error al obtener los usuarios');
      const data: Usuario[] = await response.json();
      setUsuarios(data);
    } catch {
      setError('No se pudieron cargar los usuarios.');
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje('');

    try {
      const response = await fetch('http://localhost:3000/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email }),
      });

      if (!response.ok) throw new Error('No se pudo añadir el usuario');
      setMensaje('✅ Usuario añadido con éxito');
      setNombre('');
      setEmail('');
      fetchUsuarios(); // recargar lista
    } catch (error) {
      console.error(error);
      setMensaje('❌ Error al añadir el usuario');
    }
  };

  const handleEliminar = async (id: number) => {
    if (!window.confirm('¿Seguro que quieres eliminar este usuario?')) return;

    try {
      const response = await fetch(`http://localhost:3000/api/usuarios/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Error al eliminar usuario');
      setMensaje('✅ Usuario eliminado correctamente');
      fetchUsuarios();
    } catch (error) {
      console.error(error);
      setMensaje('❌ Error al eliminar el usuario');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>👤 Lista de usuarios</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {mensaje && <p>{mensaje}</p>}

      <ul>
        {usuarios.map(usuario => (
          <li key={usuario.id}>
            <strong>{usuario.nombre}</strong> – {usuario.email}
            <button
              onClick={() => handleEliminar(usuario.id)}
              style={{
                marginLeft: '1rem',
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                padding: '0.3rem 0.6rem',
                cursor: 'pointer',
              }}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <hr style={{ margin: '2rem 0' }} />
      <h2>➕ Añadir nuevo usuario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label><br />
          <input value={nombre} onChange={e => setNombre(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label><br />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>Guardar</button>
      </form>
    </div>
  );
};

export default Usuarios;

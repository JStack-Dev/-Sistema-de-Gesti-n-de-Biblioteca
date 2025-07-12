import React, { useEffect, useState } from 'react';

interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

const UserList: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/usuarios');
        if (!response.ok) throw new Error('Error al obtener los usuarios');
        const data: Usuario[] = await response.json();
        setUsuarios(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err.message);
          setError('No se pudieron cargar los usuarios.');
        } else {
          console.error('Error desconocido', err);
          setError('Error inesperado');
        }
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div>
      <h2>📋 Lista de usuarios</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {usuarios.length > 0 ? (
        <ul>
          {usuarios.map((usuario) => (
            <li key={usuario.id}>
              <strong>{usuario.nombre}</strong> – {usuario.email}
            </li>
          ))}
        </ul>
      ) : !error ? (
        <p>Cargando usuarios...</p>
      ) : null}
    </div>
  );
};

export default UserList;

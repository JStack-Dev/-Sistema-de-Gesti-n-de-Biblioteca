import React, { useEffect, useState } from 'react';

interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

interface Libro {
  id: number;
  titulo: string;
  autor: string;
}

interface Prestamo {
  id: number;
  fecha_prestamo: string;
  fecha_devolucion: string | null;
  User: Usuario;
  Book: Libro;
}

const LoanList: React.FC = () => {
  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrestamos = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/prestamos');
        if (!response.ok) throw new Error('Error al obtener los préstamos');
        const data = await response.json();
        setPrestamos(data);
      } catch (err) {
        console.error(err);
        setError('No se pudieron cargar los préstamos');
      }
    };

    fetchPrestamos();
  }, []);

  return (
    <div>
      <h2>📚 Préstamos activos</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {prestamos.length > 0 ? (
        <ul>
          {prestamos.map((prestamo) => (
            <li key={prestamo.id}>
              <strong>{prestamo.Book.titulo}</strong> prestado por <strong>{prestamo.User.nombre}</strong> el {prestamo.fecha_prestamo}
              {prestamo.fecha_devolucion && <> – Devuelto el {prestamo.fecha_devolucion}</>}
            </li>
          ))}
        </ul>
      ) : (
        <p>Cargando préstamos...</p>
      )}
    </div>
  );
};

export default LoanList;

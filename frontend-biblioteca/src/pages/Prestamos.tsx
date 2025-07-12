// src/pages/Prestamos.tsx
import React, { useEffect, useState } from 'react';

interface Prestamo {
  id: number;
  fecha_prestamo: string;
  fecha_devolucion: string | null;
  Book: {
    titulo: string;
  };
  User: {
    nombre: string;
  };
}

const Prestamos: React.FC = () => {
  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrestamos = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/prestamos');
        if (!response.ok) throw new Error('Error al obtener los préstamos');
        const data: Prestamo[] = await response.json();
        setPrestamos(data);
      } catch {
        setError('No se pudieron cargar los préstamos.');
      }
    };

    fetchPrestamos();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📄 Préstamos activos</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {prestamos.map(prestamo => (
          <li key={prestamo.id}>
            📘 <strong>{prestamo.Book.titulo}</strong> prestado a <em>{prestamo.User.nombre}</em> el {prestamo.fecha_prestamo}
            {prestamo.fecha_devolucion ? ` (devuelto el ${prestamo.fecha_devolucion})` : ' – ❌ No devuelto'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Prestamos;

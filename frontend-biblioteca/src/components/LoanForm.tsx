// src/components/LoanForm.tsx
import React, { useState } from 'react';

interface Prestamo {
  libro_id: number;
  usuario_id: number;
  fecha_prestamo: string;
}

const LoanForm: React.FC = () => {
  const [formData, setFormData] = useState<Prestamo>({
    libro_id: 0,
    usuario_id: 0,
    fecha_prestamo: '',
  });

  const [mensaje, setMensaje] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'libro_id' || name === 'usuario_id' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje(null);

    try {
      const response = await fetch('http://localhost:3000/api/prestamos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al crear el préstamo');
      }

      setMensaje('✅ Préstamo registrado con éxito');
      setFormData({ libro_id: 0, usuario_id: 0, fecha_prestamo: '' });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMensaje(`❌ ${err.message}`);
      } else {
        setMensaje('❌ Error desconocido');
      }
    }
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>📖 Prestar un libro</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <input
          type="number"
          name="libro_id"
          placeholder="ID del libro"
          value={formData.libro_id}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="usuario_id"
          placeholder="ID del usuario"
          value={formData.usuario_id}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="fecha_prestamo"
          value={formData.fecha_prestamo}
          onChange={handleChange}
          required
        />
        <button type="submit">📤 Enviar préstamo</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default LoanForm;

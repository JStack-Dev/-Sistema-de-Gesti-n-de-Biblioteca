// src/components/LoanForm.tsx
import React, { useState } from 'react';

const LoanForm: React.FC = () => {
  const [form, setForm] = useState({
    usuarioId: '',
    libroId: '',
    fechaPrestamo: '',
    fechaDevolucion: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('📤 Datos enviados:', form);
    // Aquí puedes hacer fetch al backend o usar axios
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="usuarioId"><strong>👤 Selecciona al usuario:</strong></label>
        <input
          type="text"
          id="usuarioId"
          name="usuarioId"
          placeholder="ID del usuario"
          value={form.usuarioId}
          onChange={handleChange}
          required
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="libroId"><strong>📖 Selecciona el libro:</strong></label>
        <input
          type="text"
          id="libroId"
          name="libroId"
          placeholder="ID del libro"
          value={form.libroId}
          onChange={handleChange}
          required
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="fechaPrestamo"><strong>📅 Fecha de préstamo:</strong></label>
        <input
          type="date"
          id="fechaPrestamo"
          name="fechaPrestamo"
          value={form.fechaPrestamo}
          onChange={handleChange}
          required
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="fechaDevolucion"><strong>📅 Fecha de devolución:</strong></label>
        <input
          type="date"
          id="fechaDevolucion"
          name="fechaDevolucion"
          value={form.fechaDevolucion}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" style={{ padding: '0.5rem 1rem', fontWeight: 'bold' }}>
        ✅ Registrar préstamo
      </button>
    </form>
  );
};

export default LoanForm;

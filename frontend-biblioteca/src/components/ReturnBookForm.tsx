// src/components/ReturnBookForm.tsx
import React, { useState } from 'react';

const ReturnBookForm: React.FC = () => {
  const [loanId, setLoanId] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/devoluciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: parseInt(loanId) }),
      });

      if (!response.ok) throw new Error('Error al devolver el libro');

      const data = await response.json();
      setMensaje(data.message);
      setLoanId('');
    } catch (err) {
      setError('❌ No se pudo realizar la devolución');
      console.error(err);
    }
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>📦 Devolver un libro</h2>
      <form onSubmit={handleSubmit}>
        <label>
          ID del préstamo:
          <input
            type="number"
            value={loanId}
            onChange={(e) => setLoanId(e.target.value)}
            required
            style={{ marginLeft: '0.5rem' }}
          />
        </label>
        <button type="submit" style={{ marginLeft: '1rem' }}>Devolver</button>
      </form>
      {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ReturnBookForm;

import React from 'react';
import ReturnBookForm from '../components/ReturnBookForm';

const DevolverLibro: React.FC = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>🔁 Devolver Libro</h2>
      <ReturnBookForm />
    </div>
  );
};

export default DevolverLibro;

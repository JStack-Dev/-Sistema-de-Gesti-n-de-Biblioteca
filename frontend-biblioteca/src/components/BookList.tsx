import React, { useEffect, useState } from "react";

type Book = {
  id: number;
  titulo: string;
  autor: string;
  año_publicacion: number;
  disponible: boolean;
};

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/libros");
        if (!response.ok) throw new Error("No se pudieron cargar los libros");

        const data = await response.json();
        setBooks(data);
      } catch (err) {
        setError("❌ Error al cargar los libros");
        console.error(err);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h2>📚 Lista de Libros</h2>
      {error && <p>{error}</p>}
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <strong>{book.titulo}</strong> - {book.autor} ({book.año_publicacion}) -{" "}
            {book.disponible ? "✅ Disponible" : "❌ Prestado"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;

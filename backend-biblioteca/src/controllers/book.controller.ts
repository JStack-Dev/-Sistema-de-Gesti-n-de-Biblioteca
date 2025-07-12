// src/controllers/book.controller.ts
import { Request, Response } from 'express';
import { Book } from '../models/Book';

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    console.error('❌ Error al obtener libros:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getAvailableBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.findAll({ where: { disponible: true } });
    res.json(books);
  } catch (error) {
    console.error('❌ Error al obtener libros disponibles:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// ✅ POST /libros (añadir libro)
export const createBook = async (req: Request, res: Response) => {
  try {
    const { titulo, autor, año_publicacion } = req.body;

    if (!titulo || !autor || !año_publicacion) {
      return res.status(400).json({ message: 'Faltan campos' });
    }

    const nuevoLibro = await Book.create({ titulo, autor, año_publicacion, disponible: true });

    res.status(201).json(nuevoLibro);
  } catch (error) {
    console.error('❌ Error al crear libro:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// ✅ DELETE /libros/:id (eliminar libro)
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Verificamos que el ID exista
    const libro = await Book.findByPk(id);
    if (!libro) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }

    await libro.destroy();
    res.json({ message: '✅ Libro eliminado con éxito' });
  } catch (error) {
    console.error('❌ Error al eliminar libro:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};


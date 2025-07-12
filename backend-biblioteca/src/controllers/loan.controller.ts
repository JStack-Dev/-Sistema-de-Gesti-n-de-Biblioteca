import { Request, Response } from 'express';
import { Loan } from '../models/Loan';
import { User } from '../models/User';
import { Book } from '../models/Book';

// GET /prestamos
export const getAllLoans = async (req: Request, res: Response) => {
  try {
    const loans = await Loan.findAll({ include: [User, Book] });
    res.json(loans);
  } catch (error) {
    console.error('❌ Error al obtener préstamos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// POST /prestamos
export const createLoan = async (req: Request, res: Response) => {
  const { libro_id, usuario_id, fecha_prestamo } = req.body;

  try {
    // 1. Validar campos requeridos
    if (!libro_id || !usuario_id || !fecha_prestamo) {
      return res.status(400).json({ message: 'Faltan datos del préstamo' });
    }

    // 2. Verificar si el libro existe
    const libro = await Book.findByPk(libro_id);
    if (!libro) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }

    // 3. Verificar si el libro está disponible
    if (!libro.disponible) {
      return res.status(400).json({ message: 'El libro no está disponible' });
    }

    // 4. Crear el préstamo
    const nuevoPrestamo = await Loan.create({
      libro_id,
      usuario_id,
      fecha_prestamo,
    });

    // 5. Marcar el libro como no disponible
    await libro.update({ disponible: false });

    res.status(201).json(nuevoPrestamo);
  } catch (error) {
    console.error('❌ Error al crear préstamo:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// POST /devoluciones
export const returnLoan = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    // 1. Validar que se envíe un ID numérico
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: 'ID de préstamo inválido' });
    }

    // 2. Buscar el préstamo
    const loan = await Loan.findByPk(id);
    if (!loan) {
      return res.status(404).json({ message: 'Préstamo no encontrado' });
    }

    // 3. Validar que no esté devuelto ya
    if (loan.fecha_devolucion) {
      return res.status(400).json({ message: 'Este préstamo ya fue devuelto' });
    }

    // 4. Marcar como devuelto
    loan.fecha_devolucion = new Date();
    await loan.save();

    // 5. Hacer disponible el libro otra vez
    const book = await Book.findByPk(loan.libro_id);
    if (book) {
      book.disponible = true;
      await book.save();
    }

    res.json({ message: '✅ Libro devuelto con éxito', loan });
  } catch (error) {
    console.error('❌ Error al devolver libro:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

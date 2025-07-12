// src/routes/book.routes.ts
import { Router } from 'express';
import { getAllBooks, getAvailableBooks, createBook, deleteBook } from '../controllers/book.controller';

const router = Router();

router.get('/libros', getAllBooks);
router.get('/libros-disponibles', getAvailableBooks);
router.post('/libros', createBook); // 👈 esta ruta debe existir
router.delete('/libros/:id', deleteBook);



export default router;

// src/routes/user.routes.ts
import { Router } from 'express';
import { getAllUsers, createUser, deleteUser } from '../controllers/user.controller';

const router = Router();

router.get('/', getAllUsers);         // GET /api/usuarios
router.post('/', createUser);         // POST /api/usuarios
router.delete('/:id', deleteUser);    // DELETE /api/usuarios/:id


export default router;

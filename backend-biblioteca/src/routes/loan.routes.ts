import { Router } from 'express';
import { getAllLoans, createLoan } from '../controllers/loan.controller';
import { returnLoan } from '../controllers/loan.controller';


const router = Router();

router.get('/prestamos', getAllLoans);   // ✔️ GET: ver todos los préstamos
router.post('/prestamos', createLoan);   // ✔️ POST: crear préstamo
router.post('/devoluciones', returnLoan);


export default router;

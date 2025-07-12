import express from 'express';
import cors from 'cors'; // 👈 Importación de CORS
import { connectToDatabase } from './config/database';
import { User } from './models/User';
import { Book } from './models/Book';
import { Loan } from './models/Loan';

import userRoutes from './routes/user.routes';
import bookRoutes from './routes/book.routes';
import loanRoutes from './routes/loan.routes';

const app = express();
const PORT = 3000;


// Middlewares
app.use(cors()); // 👈 Activar CORS
app.use(express.json());

// Rutas agrupadas bajo /api
app.use('/api/usuarios', userRoutes);
app.use('/api', bookRoutes);
app.use('/api', loanRoutes);

// Relaciones Sequelize
User.hasMany(Loan, { foreignKey: 'usuario_id' });
Loan.belongsTo(User, { foreignKey: 'usuario_id' });

Book.hasMany(Loan, { foreignKey: 'libro_id' });
Loan.belongsTo(Book, { foreignKey: 'libro_id' });

// Iniciar servidor
const start = async () => {
  await connectToDatabase();

  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
};

start();

// src/models/Loan.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { User } from './User';
import { Book } from './Book';

export class Loan extends Model {
  public id!: number;
  public libro_id!: number;
  public usuario_id!: number;
  public fecha_prestamo!: Date;
  public fecha_devolucion!: Date | null;
}

Loan.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    libro_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    usuario_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    fecha_prestamo: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    fecha_devolucion: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Loan',
    tableName: 'prestamos',
    timestamps: false,
  }
);

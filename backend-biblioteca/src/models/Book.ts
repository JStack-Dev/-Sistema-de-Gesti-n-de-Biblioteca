// src/models/Book.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Book extends Model {
  public id!: number;
  public titulo!: string;
  public autor!: string;
  public año_publicacion!: number;
  public disponible!: boolean;
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    autor: {
      type: DataTypes.STRING(100),
    },
    año_publicacion: {
      type: DataTypes.INTEGER,
    },
    disponible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: 'Book',
    tableName: 'libros',
    timestamps: false,
  }
);

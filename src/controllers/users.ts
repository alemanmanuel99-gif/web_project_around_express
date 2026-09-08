import type { RequestHandler } from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';

// Construimos de forma segura la ruta absoluta al JSON usando node:path e import.meta.dirname
const usersPath = path.join(import.meta.dirname, '../../data/users.json');

export const getUsers: RequestHandler = async (req, res) => {
  try {
    // Leemos el archivo de forma asíncrona como exige el PDF
    const data = await fs.readFile(usersPath, 'utf-8');
    const users = JSON.parse(data);
    res.json(users);
    } catch {
    res.status(500).json({ message: 'Ha ocurrido un error en el servidor' });
  }

};

export const getUserById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fs.readFile(usersPath, 'utf-8');
    const users = JSON.parse(data);

    const user = users.find((user: { _id: string }) => user._id === id);

    if (!user) {
      res.status(404).json({ message: 'ID de usuario no encontrado' });
      return;
    }

    res.json(user);
     } catch {
    res.status(500).json({ message: 'Ha ocurrido un error en el servidor' });
  }
};

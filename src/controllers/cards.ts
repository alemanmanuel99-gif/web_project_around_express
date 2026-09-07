import type { RequestHandler } from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';

// Construimos de forma segura la ruta absoluta al JSON de tarjetas
const cardsPath = path.join(import.meta.dirname, '../../data/cards.json');

export const getCards: RequestHandler = async (req, res) => {
  try {
    // Leemos de forma asíncrona con el módulo de promesas
    const data = await fs.readFile(cardsPath, 'utf-8');
    const cards = JSON.parse(data);
    res.json(cards);
  } catch { // 👈 Quitamos '(error)'
    res.status(500).json({ message: 'Ha ocurrido un error en el servidor' });
  }
};

import express from 'express';
import router from './routes/index.js';

const app = express();
const PORT = 3000;

// Middlewares obligatorios para procesar datos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Montamos el sistema de rutas centralizado
app.use(router);

app.listen(PORT, () => {
  console.warn(`Servidor ejecutándose en el puerto ${PORT}`);
});

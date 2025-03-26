// Añadimos las variables del fichero ".env" a las variables de entorno.
import 'dotenv/config';

// Importamos funciones de dependencias externas.
import express from 'express';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';
import cors from 'cors';

// Importamos middlewares y rutas internas.
import { notFoundMiddleware, errorMiddleware } from './middlewares/index.js';
import { router } from './routes/index.js';

// Importamos las variables de entorno.
const UPLOADS_DIR: string = process.env.UPLOADS_DIR || 'uploads';
const PORT: number = parseInt(process.env.PORT || '3000', 10);

// Inicializamos la aplicación de Express.
const app: express.Application = express();

// Configuramos los middlewares globales.
app.use(cors());
app.use(morgan('dev'));
app.use(express.static(UPLOADS_DIR));
app.use(express.json());
app.use(fileUpload());

// Registramos las rutas de la API.
app.use(router);

// Registramos los middlewares de gestión de errores.
app.use(errorMiddleware);
app.use(notFoundMiddleware);

// Lanzamos el servidor en el puerto especificado.
app.listen(PORT, (): void => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

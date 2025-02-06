// Añadimos las variables del fichero ".env" a las variables de entorno.
import 'dotenv/config';

// Importamos las dependencias.
import express from 'express';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';
import cors from 'cors';

// Importamos los middlewares y las rutas.
import { notFoundMiddleware, errorMiddleware } from './middlewares/index.js';
import { router } from './routes/index.js';

// Importamos las variables de entorno.
const { UPLOADS_DIR, PORT } = process.env;

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.static(UPLOADS_DIR));
app.use(express.json());
app.use(fileUpload());
app.use(router);
app.use(errorMiddleware);
app.use(notFoundMiddleware);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

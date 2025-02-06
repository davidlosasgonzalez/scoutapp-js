// Importamos las dependencias.
import fs from 'fs-extra';
import path from 'path';

// Importamos los errores.
import { deleteFileError } from '../services/errorsService.js';

// Importamos las variables de entorno.
const { UPLOADS_DIR } = process.env;

// Inicializamos la utilidad.
const removeImgUtil = async (imgName) => {
    try {
        const imgPath = path.join(process.cwd(), UPLOADS_DIR, imgName);

        await fs.remove(imgPath);
    } catch (err) {
        console.error(err);

        deleteFileError();
    }
};

export default removeImgUtil;

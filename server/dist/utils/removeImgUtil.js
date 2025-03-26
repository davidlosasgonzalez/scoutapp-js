// Importamos funciones de dependencias externas.
import fs from 'fs-extra';
import path from 'path';
// Importamos errores personalizados.
import { deleteFileError } from '../services/errorsService.js';
// Importamos las variables de entorno.
const { UPLOADS_DIR } = process.env;
// Inicializamos la utilidad.
export const removeImgUtil = async (imgName) => {
    try {
        const imgPath = path.join(process.cwd(), UPLOADS_DIR || 'uploads', imgName);
        await fs.remove(imgPath);
    }
    catch (err) {
        console.error(err);
        deleteFileError();
    }
};

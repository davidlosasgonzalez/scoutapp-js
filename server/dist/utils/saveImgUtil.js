// Importamos funciones de dependencias externas.
import fs from 'fs-extra';
import path from 'path';
import sharp from 'sharp';
import crypto from 'crypto';
// Importamos errores personalizados.
import { saveFileError } from '../services/errorsService.js';
// Importamos las variables de entorno.
const { UPLOADS_DIR } = process.env;
// Inicializamos la utilidad.
export const saveImgUtil = async (img, width) => {
    try {
        const uploadsPath = path.join(process.cwd(), UPLOADS_DIR || 'uploads');
        await fs.mkdirp(uploadsPath);
        const sharpImg = sharp(img.data);
        sharpImg.resize(width);
        const imgName = `${crypto.randomUUID()}.jpg`;
        const imgPath = path.join(uploadsPath, imgName);
        await sharpImg.toFile(imgPath);
        return imgName;
    }
    catch (err) {
        console.error(err);
        saveFileError();
        // Esta línea nunca se ejecuta, pero asegura a TypeScript que la función siempre retorna un string.
        return '';
    }
};

// Importamos las dependencias.
import fs from 'fs-extra';
import path from 'path';
import sharp from 'sharp';

// Importamos los errores.
import { saveFileError } from '../services/errorsService.js';

// Importamos las variables de entorno.
const { UPLOADS_DIR } = process.env;

// Inicializamos la utilidad.
const saveImgUtil = async (img, width) => {
    try {
        const uploadsPath = path.join(process.cwd(), UPLOADS_DIR);

        await fs.mkdirp(uploadsPath);

        const sharpImg = sharp(img.data);

        sharpImg.resize(width);

        const imgName = `${crypto.randomUUID()}.jpg`;

        const imgPath = path.join(uploadsPath, imgName);

        await sharpImg.toFile(imgPath);

        return imgName;
    } catch (err) {
        console.error(err);

        saveFileError();
    }
};

export default saveImgUtil;

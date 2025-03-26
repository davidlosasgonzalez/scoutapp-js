// Importamos los modelos.
import { insertVideoUrlModel } from '../../models/players/insertVideoUrlModel.js';
// Importamos las utilidades.
import { extractVideoIdUtil } from '../../utils/extractYoutubeIdUtil.js';
// Importamos la validación con Joi.
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';
import { addVideoUrlSchema } from '../../schemas/players/addVideoUrlSchema.js';
// Inicializamos la función controladora.
export const addVideoUrlController = async (req, res, next) => {
    try {
        const playerId = req.params.playerId;
        await validateSchemaUtil(addVideoUrlSchema, req.body);
        const youtubeId = extractVideoIdUtil(req.body.url);
        if (!youtubeId) {
            throw new Error('URL de YouTube no válida');
        }
        const videoId = await insertVideoUrlModel(youtubeId, playerId);
        res.status(201).send({
            status: 'ok',
            message: 'Vídeo insertado',
            data: {
                video: {
                    id: videoId,
                    youtubeId,
                },
            },
        });
    }
    catch (err) {
        next(err);
    }
};

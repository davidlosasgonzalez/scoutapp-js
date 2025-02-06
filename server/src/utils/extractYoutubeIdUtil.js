// Inicializamos la utilidad.
const extractVideoIdUtil = (url) => {
    const match = url.match(
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([\w-]+)/,
    );

    return match ? match[1] : null;
};

export default extractVideoIdUtil;

// Inicializamos la utilidad.
export const extractVideoIdUtil = (url) => {
    const match = url.match(/(?:youtube\.com\/(?:[^/]+\/.+|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/);
    return match ? match[1] : null;
};

// Inicializamos el middleware de gestión de errores.
// eslint-disable-next-line no-unused-vars
export const errorMiddleware = (err, req, res, next) => {
    // Mostramos el error por consola.
    console.error(err);
    // Enviamos una respuesta genérica de error.
    res.status(err.httpStatus || 500).json({
        status: 'error',
        code: err.code || 'INTERNAL_SERVER_ERROR',
        message: err.message || 'Error interno del servidor',
    });
};

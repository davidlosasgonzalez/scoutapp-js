// Inicializamos el middleware.
// eslint-disable-next-line no-unused-vars
const errorMiddleware = (err, req, res, next) => {
    console.error(err);

    res.status(err.httpStatus || 500).json({
        status: 'error',
        code: err.code || 'INTERNAL_SERVER_ERROR',
        message: err.message,
    });
};

export default errorMiddleware;

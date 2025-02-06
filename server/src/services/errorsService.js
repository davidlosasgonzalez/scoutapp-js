export const deleteFileError = () => {
    throw {
        httpStatus: 409, // Conflict
        code: 'FILE_DELETED_FAILED',
        message: 'Error al eliminar el archivo del disco',
    };
};

export const duplicateHiringRequestError = () => {
    throw {
        httpStatus: 409, // Conflict
        code: 'DUPLICATE_HIRING_REQUEST',
        message: 'No puedes enviar más de una solicitud sobre un jugador',
    };
};

export const emailAlreadyRegisteredError = () => {
    throw {
        httpStatus: 409, // Conflict
        code: 'EMAIL_ALREADY_REGISTERED',
        message: 'El email ya está registrado',
    };
};

export const hiringRequestAlreadyProcessedError = () => {
    throw {
        httpStatus: 409, // Conflict
        code: 'HIRING_REQUEST_ALREADY_PROCESSED',
        message: 'Ya has finalizado esta solicitud de contratación',
    };
};

export const invalidCredentialsError = () => {
    throw {
        httpStatus: 401, // Unauthorized
        code: 'INVALID_CREDENTIALS',
        message: 'Credenciales inválidas',
    };
};

export const invalidRoleError = () => {
    throw {
        httpStatus: 409, // Conflict
        code: 'INVALID_ROLE',
        message: 'Selecciona un rol válido',
    };
};

export const invalidStrongFootError = () => {
    throw {
        httpStatus: 409, // Conflict
        code: 'INVALID_STRONG_FOOT',
        message: 'Seleccione un pie dominante válido',
    };
};

export const invalidTokenError = () => {
    throw {
        httpStatus: 401, // Unauthorized
        code: 'INVALID_TOKEN',
        message: 'Token inválido',
    };
};

export const maxPlayersLimitError = () => {
    throw {
        httpStatus: 409, // Conflict
        code: 'MAX_PLAYERS_LIMIT',
        message: 'No puedes crear más de 5 jugadores',
    };
};

export const mustBeAdultError = () => {
    throw {
        httpStatus: 409, // Conflict
        code: 'MUST_BE_ADULT',
        message: 'Para crear una cuenta debes ser mayor de edad',
    };
};

export const notAuthenticatedError = () => {
    throw {
        httpStatus: 401, // Unauthorized
        code: 'NOT_AUTHENTICATED',
        message: `Debes enviar un token en el header 'Authorization'`,
    };
};

export const notFoundError = (resource) => {
    throw {
        httpStatus: 404, // Not Found
        code: 'RESOURCE_NOT_FOUND',
        message: `El recurso requerido '${resource}' no existe`,
    };
};

export const playerMustBeMinorError = () => {
    throw {
        httpStatus: 409, // Conflict
        code: 'PLAYER_MUST_BE_MINOR',
        message: 'El perfil de un jugador debe ser menor de edad',
    };
};

export const saveFileError = () => {
    throw {
        httpStatus: 500, // Internal Server Error
        code: 'FILE_SAVE_FAILED',
        message: 'Error al guardar el archivo en el disco',
    };
};

export const userAlreadyRegisteredError = () => {
    throw {
        httpStatus: 409, // Conflict
        code: 'USER_ALREADY_REGISTERED',
        message: 'El nombre de usuario ya está registrado',
    };
};

export const unauthorizedUserError = () => {
    throw {
        httpStatus: 409, // Conflict
        code: 'UNAUTHORIZED',
        message: 'El usuario no está autorizado para hacer esta operación',
    };
};

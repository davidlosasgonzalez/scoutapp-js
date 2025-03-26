// Inicializamos la utilidad para lanzar errores personalizados.
const createError = (httpStatus, code, message) => {
    const error = {
        name: 'CustomError',
        httpStatus,
        code,
        message,
    };
    throw error;
};
// Inicializamos los errores disponibles.
export const deleteFileError = () => createError(409, 'FILE_DELETED_FAILED', 'Error al eliminar el archivo del disco');
export const duplicateHiringRequestError = () => createError(409, 'DUPLICATE_HIRING_REQUEST', 'No puedes enviar más de una solicitud sobre un jugador');
export const emailAlreadyRegisteredError = () => createError(409, 'EMAIL_ALREADY_REGISTERED', 'El email ya está registrado');
export const hiringRequestAlreadyProcessedError = () => createError(409, 'HIRING_REQUEST_ALREADY_PROCESSED', 'Ya has finalizado esta solicitud de contratación');
export const invalidCredentialsError = () => createError(401, 'INVALID_CREDENTIALS', 'Credenciales inválidas');
export const invalidRoleError = () => createError(409, 'INVALID_ROLE', 'Selecciona un rol válido');
export const invalidStrongFootError = () => createError(409, 'INVALID_STRONG_FOOT', 'Seleccione un pie dominante válido');
export const invalidTokenError = () => createError(401, 'INVALID_TOKEN', 'Token inválido');
export const maxPlayersLimitError = () => createError(409, 'MAX_PLAYERS_LIMIT', 'No puedes crear más de 5 jugadores');
export const mustBeAdultError = () => createError(409, 'MUST_BE_ADULT', 'Para crear una cuenta debes ser mayor de edad');
export const notAuthenticatedError = () => createError(401, 'NOT_AUTHENTICATED', `Debes enviar un token en el header 'Authorization'`);
export const notFoundError = (resource) => createError(404, 'RESOURCE_NOT_FOUND', `El recurso requerido '${resource}' no existe`);
export const passwordsDoNotMatchError = () => createError(400, 'PASSWORDS_DO_NOT_MATCH', 'Las contraseñas no coinciden');
export const playerMustBeMinorError = () => createError(409, 'PLAYER_MUST_BE_MINOR', 'El perfil de un jugador debe ser menor de edad');
export const saveFileError = () => createError(500, 'FILE_SAVE_FAILED', 'Error al guardar el archivo en el disco');
export const userAlreadyRegisteredError = () => createError(409, 'USER_ALREADY_REGISTERED', 'El nombre de usuario ya está registrado');
export const unauthorizedUserError = () => createError(409, 'UNAUTHORIZED', 'El usuario no está autorizado para hacer esta operación');

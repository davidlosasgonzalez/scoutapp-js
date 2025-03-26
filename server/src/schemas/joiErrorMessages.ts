// Inicializamos el objeto con mensajes personalizados de error para Joi.
export const joiErrorMessages: Record<string, string> = {
    // Errores de campos obligatorios.
    'any.required': 'El campo "{#key}" es requerido.',

    // Errores de cadenas de texto.
    'string.base': 'El valor de "{#key}" debe ser una cadena.',
    'string.empty': 'El campo "{#key}" no puede estar vacío.',
    'string.alphanum': 'El "{#key}" solo puede contener letras y números.',
    'string.email':
        'Debe proporcionar un correo electrónico válido para "{#key}".',
    'string.min': 'El campo "{#key}" debe tener al menos {#limit} caracteres.',
    'string.max': 'El campo "{#key}" no debe exceder los {#limit} caracteres.',
    'string.pattern.base': 'El campo "{#key}" tiene un formato no válido.',

    // Errores de números.
    'number.base': 'El valor de "{#key}" debe ser un número.',
    'number.max': 'El archivo no debe exceder los 5 MB.',

    // Errores de objetos y validaciones generales.
    'object.base': 'El valor de "{#key}" debe ser un objeto.',
    'object.unknown': 'No se permiten campos adicionales en este objeto.',
    'object.min': 'Debe proporcionar al menos un campo para actualizar.',

    // Errores de fechas.
    'date.less': 'Debes tener al menos 18 años para registrarte.',
    'date.greater': 'El jugador debe ser menor de 18 años.',
};

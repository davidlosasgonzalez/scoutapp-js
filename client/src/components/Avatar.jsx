// Importamos librerías externas.
import PropTypes from 'prop-types';

// Importamos las variables de entorno.
const { VITE_API_URL, VITE_DEFAULT_AVATAR } = import.meta.env;

// Inicializamos el componente.
const Avatar = ({ avatar, username, onClick, className }) => {
    return (
        <img
            src={avatar ? `${VITE_API_URL}/${avatar}` : VITE_DEFAULT_AVATAR}
            alt={username}
            className={`avatar ${className || ''}`}
            onClick={onClick} // Solo será clickeable si se pasa la prop.
            style={onClick ? { cursor: 'pointer' } : {}} // Cursor solo si es clickeable.
        />
    );
};

// Definimos las validaciones de las props.
Avatar.propTypes = {
    avatar: PropTypes.string, // Ruta del avatar del usuario.
    username: PropTypes.string.isRequired, // Nombre de usuario, requerido para el atributo `alt`.
    onClick: PropTypes.func, // Si se pasa, la imagen será clickeable.
    className: PropTypes.string, // Permitir clases personalizadas.
};

export default Avatar;

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
            // Solo será clickeable si se pasa la prop.
            onClick={onClick}
            // Cursor solo si es clickeable.
            style={onClick ? { cursor: 'pointer' } : {}}
        />
    );
};

// Definimos las validaciones de las props.
Avatar.propTypes = {
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string,
};

export default Avatar;

// Importamos librerías externas.
import PropTypes from 'prop-types';

// Importamos las variables de entorno.
import { getEnv } from '@/config/env.js';
const { apiUrl, defaultAvatar } = getEnv();

// Inicializamos el componente.
const Avatar = ({ avatar, username, onClick, className }) => {
    return (
        <img
            src={avatar ? `${apiUrl}/${avatar}` : defaultAvatar}
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

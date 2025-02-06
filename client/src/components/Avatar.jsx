import PropTypes from 'prop-types';

const { VITE_API_URL, VITE_DEFAULT_AVATAR } = import.meta.env;

const Avatar = ({ avatar, username, onClick, className }) => {
    return (
        <img
            src={avatar ? `${VITE_API_URL}/${avatar}` : VITE_DEFAULT_AVATAR}
            alt={username}
            className={`avatar ${className || ''}`}
            onClick={onClick} // Solo será clickeable si se pasa la prop
            style={onClick ? { cursor: 'pointer' } : {}} // Cursor solo si es clickeable
        />
    );
};

Avatar.propTypes = {
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
    onClick: PropTypes.func, // Si se pasa, será clickeable
    className: PropTypes.string, // Permitir clases personalizadas
};

export default Avatar;

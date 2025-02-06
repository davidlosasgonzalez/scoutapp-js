import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import Avatar from '../components/Avatar';

// Inicializamos el componente.
const PlayerListItem = ({
    playerId,
    avatar,
    owner,
    firstName,
    lastName,
    birthDate,
    position,
    team,
    strongFoot,
}) => {
    return (
        <li key={playerId}>
            <Link to={`/players/${playerId}`}>
                <header>
                    <Avatar avatar={avatar} username={owner} />
                    <h3>
                        {firstName} {lastName}
                    </h3>
                </header>
                <div>
                    <ul>
                        <li>
                            Fecha de nacimiento:{' '}
                            {new Date(birthDate).toLocaleDateString('es-ES', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                            })}
                        </li>
                        <li>Posición: {position}</li>
                        <li>Equipo actual: {team}</li>
                        <li>Pierna dominante: {strongFoot}</li>
                    </ul>
                </div>
                <footer>
                    <ul>
                        <li>Familiar: {owner}</li>
                    </ul>
                </footer>
            </Link>
        </li>
    );
};

PlayerListItem.propTypes = {
    playerId: PropTypes.number.isRequired,
    avatar: PropTypes.string,
    owner: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    birthDate: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    team: PropTypes.string,
    strongFoot: PropTypes.string.isRequired,
};

export default PlayerListItem;

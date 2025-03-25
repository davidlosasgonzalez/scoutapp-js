// Importamos librerías externas.
import PropTypes from 'prop-types';

// Importamos los componentes.
import Link from 'next/link';
import Avatar from '@/components/Avatar';

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
            {/* Enlace a la página de detalles del jugador. */}
            <Link href={`/players/${playerId}`}>
                {/* Encabezado con el avatar y el nombre del jugador. */}
                <header>
                    <Avatar avatar={avatar} username={owner} />
                    <h3>
                        {firstName} {lastName}
                    </h3>
                </header>

                {/* Información del jugador. */}
                <div>
                    <ul>
                        {/* Fecha de nacimiento del jugador. */}
                        <li>
                            Fecha de nacimiento:{' '}
                            {new Date(birthDate).toLocaleDateString('es-ES', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                            })}
                        </li>

                        {/* Posición del jugador en el campo. */}
                        <li>Posición: {position}</li>

                        {/* Equipo actual del jugador. */}
                        <li>Equipo actual: {team}</li>

                        {/* Pierna dominante del jugador. */}
                        <li>Pierna dominante: {strongFoot}</li>
                    </ul>
                </div>

                {/* Información adicional sobre el jugador. */}
                <footer>
                    <ul>
                        {/* Nombre del familiar que registró al jugador. */}
                        <li>Familiar: {owner}</li>
                    </ul>
                </footer>
            </Link>
        </li>
    );
};

// Definimos las validaciones de las props.
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

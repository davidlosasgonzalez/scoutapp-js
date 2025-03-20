// Importamos los hooks.
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, Navigate } from 'react-router-dom';

// Importamos las acciones de Redux.
import {
    fetchPlayerById,
    addPlayerVideo,
    sendHiringRequest,
} from '../redux/slices/playerSlice';

// Importamos los componentes.
import Avatar from '../components/Avatar';
import YoutubeEmbed from '../components/YoutubeEmbed';

// Importamos funciones auxiliares.
import { differenceInYears } from 'date-fns';

const PlayerDetailsPage = () => {
    // Extraemos parámetros de la URL.
    const { playerId } = useParams();

    // Inicializamos el hook de Redux para enviar acciones.
    const dispatch = useDispatch();

    // Obtenemos authToken y authUser desde el estado de Redux.
    const { authToken, authUser } = useSelector((state) => state.auth);

    // Obtenemos el jugador actual y el estado de carga del slice de jugadores.
    const { currentPlayer: player, loading } = useSelector(
        (state) => state.players,
    );

    // Estado local para almacenar la URL del video.
    const [url, setUrl] = useState('');

    // Al montar el componente, obtenemos el jugador por ID si aún no está cargado.
    useEffect(() => {
        if (!player || player.id !== Number(playerId)) {
            dispatch(fetchPlayerById(playerId));
        }
    }, [dispatch, player, playerId]);

    // Función que maneja el envío del formulario para añadir un video.
    const handleAddVideo = async (e) => {
        e.preventDefault();
        dispatch(addPlayerVideo({ playerId, url, authToken }));
        setUrl('');
    };

    // Función que maneja el envío de la solicitud de contratación.
    const handleSendHiringRequest = () => {
        dispatch(sendHiringRequest({ playerId, authToken }));
    };

    // Si el usuario no está autenticado, redirigimos a la página principal.
    if (!authUser) return <Navigate to="/" />;

    // Si aún no se ha cargado el jugador, mostramos un indicador de carga.
    if (!player) return <div>Cargando...</div>;

    return (
        <main>
            <h2>
                Página de detalles del jugador {player.firstName}{' '}
                {player.lastName}
            </h2>

            {/* Avatar del jugador. */}
            <Avatar avatar={player.avatar} username={player.owner} />

            {/* Botón de edición: se muestra si el usuario autenticado es el dueño del jugador. */}
            {authUser && authUser.id === player.familyUserId && (
                <Link
                    className="edit-player-btn"
                    to={`/players/${playerId}/edit`}
                >
                    Editar Jugador
                </Link>
            )}

            {/* Botón de contratación: se muestra si el usuario tiene el rol de 'scout'. */}
            {authUser && authUser.role === 'scout' && (
                <button onClick={handleSendHiringRequest} disabled={loading}>
                    Solicitud de contacto
                </button>
            )}

            {/* Lista de información del jugador. */}
            <ul>
                <li>
                    Nombre: {player.firstName} {player.lastName}
                </li>
                <li>
                    Edad: {differenceInYears(new Date(), player.birthDate)} años
                </li>
                <li>Posición: {player.position}</li>
                <li>Habilidades: {player.skills}</li>
                <li>Equipo: {player.team}</li>
                <li>Pierna dominante: {player.strongFoot}</li>
            </ul>

            {/* Formulario para añadir un video (solo visible para el dueño del jugador). */}
            {authUser && authUser.id === player.familyUserId && (
                <form onSubmit={handleAddVideo}>
                    <label htmlFor="video">Vídeo de YouTube:</label>
                    <input
                        type="url"
                        name="video"
                        id="video"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        autoFocus
                        required
                    />
                    <button disabled={loading}>Añadir</button>
                </form>
            )}

            {/* Lista de vídeos asociados al jugador. */}
            <ul>
                {player.videos.map((video) => (
                    <YoutubeEmbed key={video.id} youtubeId={video.youtubeId} />
                ))}
            </ul>
        </main>
    );
};

export default PlayerDetailsPage;

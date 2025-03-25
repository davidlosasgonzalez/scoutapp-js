// Importamos los hooks.
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

// Importamos las acciones de Redux.
import {
    fetchPlayerById,
    addPlayerVideo,
    sendHiringRequest,
} from '@/redux/slices/players';

// Importamos los componentes.
import Avatar from '@/components/Avatar';
import YoutubeEmbed from '@/components/YoutubeEmbed';
import Link from 'next/link';

// Importamos funciones auxiliares.
import { differenceInYears } from 'date-fns';

// Inicializamos el componente.
const PlayerDetailsPage = () => {
    // Inicializamos el router de Next.js.
    const router = useRouter();

    // Extraemos parámetros dinámicos de la URL.
    const { playerId } = router.query;

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
        if (playerId && (!player || player.id !== Number(playerId))) {
            dispatch(fetchPlayerById(playerId));
        }
    }, [dispatch, player, playerId]);

    // Si el usuario no está autenticado, lo redirigimos a la página principal.
    useEffect(() => {
        if (typeof window !== 'undefined' && !authUser) {
            router.replace('/');
        }
    }, [authUser, router]);

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

    // Si aún no se ha cargado el jugador, mostramos un indicador de carga.
    if (!player) return <div>Cargando...</div>;

    // Calculamos la edad del jugador validando la fecha.
    const birthDate = new Date(player.birthDate);
    const age = isNaN(birthDate)
        ? 'N/D'
        : differenceInYears(new Date(), birthDate);

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
                    href={`/players/${playerId}/edit`}
                    className="edit-player-btn"
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
                <li>Edad: {age} años</li>
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

// Exportamos el componente.
export default PlayerDetailsPage;

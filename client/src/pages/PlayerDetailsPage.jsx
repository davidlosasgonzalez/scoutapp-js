// Importamos los hooks.
import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import usePlayer from '../hooks/usePlayer';

// Importamos el contexto de autenticación.
import { AuthContext } from '../contexts/AuthContext';

// Importamos funciones auxiliares.
import { differenceInYears } from 'date-fns';

// Importamos los componentes.
import { Link } from 'react-router-dom';
import Avatar from '../components/Avatar';
import YoutubeEmbed from '../components/YoutubeEmbed';

// Importamos librerías externas.
import toast from 'react-hot-toast';

// Importamos las variables de entorno.
const { VITE_API_URL } = import.meta.env;

// Inicializamos el componente.
const PlayerDetailsPage = () => {
    // Extraemos valores del contexto de autenticación.
    const { authToken, authUser } = useContext(AuthContext);

    // Extraemos parámetros de la URL.
    const { playerId } = useParams();

    // Extraemos valores del hook `usePlayer`.
    const { player, addPlayerVideoState } = usePlayer(playerId);

    // Estado local para almacenar la URL del video.
    const [url, setUrl] = useState('');

    // Extraemos valores del hook `useFetch`.
    const { fetchData, loading } = useFetch();

    // Función que maneja el envío del formulario para añadir un video.
    const handleAddVideo = async (e) => {
        // Prevenimos la recarga de la página.
        e.preventDefault();

        // Realizamos la petición y obtenemos el body.
        const body = await fetchData({
            url: `${VITE_API_URL}/api/players/${playerId}/videos`,
            method: 'POST',
            body: { url },
            authToken,
            toastId: 'playersDetailsPage',
        });

        // Si la respuesta es válida, actualizamos el estado y mostramos un mensaje.
        if (body) {
            addPlayerVideoState(body.data.video);
            toast.success(body.message, { id: 'playerDetailsPage' });
        }
    };

    // Función que maneja el envío de la solicitud de contratación.
    const handleSendHiringRequest = async () => {
        // Realizamos la petición y obtenemos el body.
        const body = await fetchData({
            url: `${VITE_API_URL}/api/players/${playerId}/hirings`,
            method: 'POST',
            authToken,
            toastId: 'playerDetailsPage',
        });

        // Si la respuesta es válida, mostramos un mensaje.
        if (body) {
            toast.success(body.message, { id: 'playerDetailsPage' });
        }
    };

    return (
        <main>
            {/* Verificamos que `player` existe antes de renderizar. */}
            {player && (
                <>
                    <h2>
                        Página de detalles del jugador {player.firstName}{' '}
                        {player.lastName}
                    </h2>

                    {/* Avatar del jugador. */}
                    <Avatar avatar={player.avatar} username={player.owner} />

                    {
                        // Si estamos logueados y somos dueños del jugador mostramos el botón de editar.
                        authUser && authUser.id === player.familyUserId && (
                            <Link
                                className="edit-player-btn"
                                to={`/players/${playerId}/edit`}
                            >
                                Editar Jugador
                            </Link>
                        )
                    }

                    {
                        // Si estamos logueados y somos ojeadores mostramos el botón de solicitar contratación.
                        authUser && authUser.role === 'scout' && (
                            <button
                                onClick={handleSendHiringRequest}
                                disabled={loading}
                            >
                                Solicitud de contacto
                            </button>
                        )
                    }

                    {/* Lista de información del jugador. */}
                    <ul>
                        <li>
                            Nombre: {player.firstName} {player.lastName}
                        </li>
                        <li>
                            Edad:{' '}
                            {differenceInYears(new Date(), player.birthDate)}{' '}
                            años
                        </li>
                        <li>Posición: {player.position}</li>
                        <li>Habilidades: {player.skills}</li>
                        <li>Equipo: {player.team}</li>
                        <li>Pierna dominante: {player.strongFoot}</li>
                    </ul>

                    {
                        // Si estamos logueados y somos dueños del jugador mostramos el formulario.
                        authUser && authUser.id === player.familyUserId && (
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
                        )
                    }

                    {/* Lista de vídeos asociados al jugador. */}
                    <ul>
                        {player.videos.map((video) => {
                            return (
                                <YoutubeEmbed
                                    key={video.id}
                                    youtubeId={video.youtubeId}
                                />
                            );
                        })}
                    </ul>
                </>
            )}
        </main>
    );
};

export default PlayerDetailsPage;

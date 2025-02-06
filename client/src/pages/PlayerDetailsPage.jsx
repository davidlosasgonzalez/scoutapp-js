import { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import usePlayer from '../hooks/usePlayer';

import { AuthContext } from '../contexts/AuthContext';

import { differenceInYears } from 'date-fns';

import Avatar from '../components/Avatar';
import YoutubeEmbed from '../components/YoutubeEmbed';

import toast from 'react-hot-toast';

const { VITE_API_URL } = import.meta.env;

// Inicializamos el componente.
const PlayerDetailsPage = () => {
    const { authToken, authUser } = useContext(AuthContext);

    const { playerId } = useParams();

    const { player, addPlayerVideoState } = usePlayer(playerId);

    const [url, setUrl] = useState('');

    const { fetchData, loading } = useFetch();

    // Función que maneja el envío del formulario.
    const handleAddVideo = async (e) => {
        e.preventDefault();

        const body = await fetchData({
            url: `${VITE_API_URL}/api/players/${playerId}/videos`,
            method: 'POST',
            body: { url },
            authToken,
        });

        if (body) {
            addPlayerVideoState(body.data.video);
            toast.success(body.message, { id: 'playerDetailsPage' });
        }
    };

    // Función que maneja el envío de la solicitud de contratación.
    const handleSendHiringRequest = async () => {
        const body = await fetchData({
            url: `${VITE_API_URL}/api/players/${playerId}/hirings`,
            method: 'POST',
            authToken,
        });

        if (body) {
            toast.success(body.message, { id: 'playerDetailsPage' });
        }
    };

    return (
        <main>
            {player && (
                <>
                    <h2>
                        Página de detalles del jugador {player.firstName}{' '}
                        {player.lastName}
                    </h2>
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

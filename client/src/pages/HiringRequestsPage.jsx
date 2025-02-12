// Importamos los hooks.
import { useContext } from 'react';
import useHiringList from '../hooks/useHiringList';
import useFetch from '../hooks/useFetch';

// Importamos los componentes.
import { Navigate } from 'react-router-dom';

// Importamos el contexto de autenticación.
import { AuthContext } from '../contexts/AuthContext';

// Importamos librerías externas.
import toast from 'react-hot-toast';

// Importamos las variables de entorno.
const { VITE_API_URL } = import.meta.env;

// Inicializamos el componente.
const HiringRequestPage = () => {
    // Extraemos valores del contexto de autenticación.
    const { authToken, authUser } = useContext(AuthContext);

    // Extraemos valores del hook `useHiringList`.
    const { hiringRequests, updateHiringState } = useHiringList(authToken);

    // Extraemos valores del hook `useFetch`.
    const { fetchData, loading } = useFetch();

    // Función que maneja el click de los botones de aceptar o rechazar.
    const handleHiringRequest = async (e, playerId, hiringId) => {
        // Determinamos el nuevo estado de la solicitud en función del botón presionado.
        const newStatus =
            e.currentTarget.textContent === '✅' ? 'aceptada' : 'rechazada';

        // Realizamos la petición y obtenemos el body.
        const body = await fetchData({
            url: `${VITE_API_URL}/api/players/${playerId}/hirings/${hiringId}`,
            method: 'PUT',
            body: { newStatus },
            authToken,
            toastId: 'hiringRequestsPage',
        });

        // Si la respuesta es válida, actualizamos el estado y mostramos un mensaje.
        if (body) {
            updateHiringState(newStatus, hiringId);
            toast.success(body.message, { id: 'hiringRequestPage' });
        }
    };

    // Si el usuario no está autenticado, lo redirigimos a la página de inicio.
    if (!authUser) {
        return <Navigate to="/" />;
    }

    return (
        <main className="hiring-request-page">
            {/* Lista de solicitudes de contratación. */}
            <ul>
                {hiringRequests.length > 0 ? (
                    hiringRequests.map((request) => {
                        return (
                            <li key={request.id}>
                                <ul>
                                    {/* Información del jugador. */}
                                    <li>
                                        Jugador: {request.playerFirstName}{' '}
                                        {request.playerLastName}
                                    </li>

                                    {authUser.role === 'scout' ? (
                                        <>
                                            {/* Información del familiar si el usuario es un ojeador. */}
                                            <li>
                                                Familiar:{' '}
                                                {request.familyUsername}
                                            </li>

                                            {request.status === 'aceptada' && (
                                                <li>
                                                    Contacto:{' '}
                                                    {request.familyEmail}
                                                </li>
                                            )}
                                        </>
                                    ) : (
                                        // Información del ojeador si el usuario es un familiar.
                                        <li>
                                            Ojeador: {request.scoutUsername}
                                        </li>
                                    )}

                                    {/* Estado de la solicitud y botones de acción. */}
                                    <li>
                                        Estado solicitud: {request.status}{' '}
                                        {request.status === 'pendiente' &&
                                            authUser?.role === 'family' && (
                                                <>
                                                    <button
                                                        onClick={(e) =>
                                                            handleHiringRequest(
                                                                e,
                                                                request.playerId,
                                                                request.id,
                                                            )
                                                        }
                                                        disabled={loading}
                                                    >
                                                        ❌
                                                    </button>
                                                    <button
                                                        onClick={(e) =>
                                                            handleHiringRequest(
                                                                e,
                                                                request.playerId,
                                                                request.id,
                                                            )
                                                        }
                                                        disabled={loading}
                                                    >
                                                        ✅
                                                    </button>
                                                </>
                                            )}
                                    </li>
                                </ul>
                            </li>
                        );
                    })
                ) : (
                    <li>No se han encontrado solicitudes de contratación</li>
                )}
            </ul>
        </main>
    );
};

export default HiringRequestPage;

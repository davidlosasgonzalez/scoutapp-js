// Importamos los hooks de React y Redux.
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Importamos el hook de navegación de Next.js.
import { useRouter } from 'next/router';

// Importamos las acciones de Redux.
import {
    fetchHiringRequests,
    updateHiringRequest,
} from '@/redux/slices/players';

// Inicializamos el componente.
const HiringRequestPage = () => {
    // Obtenemos el router para hacer redirecciones.
    const router = useRouter();

    // Obtenemos authToken y authUser desde el estado de Redux.
    const { authToken, authUser } = useSelector((state) => state.auth);

    // Obtenemos la lista de solicitudes y el estado de carga del slice de jugadores.
    const { hiringRequests, loading } = useSelector((state) => state.players);

    // Inicializamos el hook de Redux para enviar acciones.
    const dispatch = useDispatch();

    // Al montar el componente, obtenemos la lista de solicitudes de contratación.
    useEffect(() => {
        if (authToken) {
            dispatch(fetchHiringRequests());
        }
    }, [dispatch, authToken]);

    // Redirigimos al usuario a la home si no está autenticado.
    useEffect(() => {
        if (typeof window !== 'undefined' && !authUser) {
            router.push('/');
        }
    }, [authUser, router]);

    // Función que maneja el click de los botones para aceptar o rechazar.
    const handleHiringRequest = (e, playerId, hiringId) => {
        const newStatus =
            e.currentTarget.textContent === '✅' ? 'aceptada' : 'rechazada';

        dispatch(
            updateHiringRequest({ playerId, hiringId, newStatus, authToken }),
        );
    };

    return (
        <main className="hiring-request-page">
            <ul>
                {hiringRequests.length > 0 ? (
                    hiringRequests.map((request) => (
                        <li key={request.id}>
                            <ul>
                                {/* Información del jugador */}
                                <li>
                                    Jugador: {request.playerFirstName}{' '}
                                    {request.playerLastName}
                                </li>

                                {authUser?.role === 'scout' ? (
                                    <>
                                        {/* Información del familiar si el usuario es un ojeador */}
                                        <li>
                                            Familiar: {request.familyUsername}
                                        </li>
                                        {request.status === 'aceptada' && (
                                            <li>
                                                Contacto: {request.familyEmail}
                                            </li>
                                        )}
                                    </>
                                ) : (
                                    // Información del ojeador si el usuario es un familiar.
                                    <li>Ojeador: {request.scoutUsername}</li>
                                )}

                                {/* Estado de la solicitud y botones de acción */}
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
                    ))
                ) : (
                    <li>No se han encontrado solicitudes de contratación</li>
                )}
            </ul>
        </main>
    );
};

export default HiringRequestPage;

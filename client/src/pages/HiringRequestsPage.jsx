import { useContext } from 'react';
import useHiringList from '../hooks/useHiringList';

import { Navigate } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthContext';

import toast from 'react-hot-toast';
import useFetch from '../hooks/useFetch';

const { VITE_API_URL } = import.meta.env;

// Inicializamos el componente.
const HiringRequestPage = () => {
    const { authToken, authUser } = useContext(AuthContext);

    const { hiringRequests, updateHiringState } = useHiringList(authToken);

    const { fetchData, loading } = useFetch();

    // Función que maneja el click de los botones de aceptar o rechazar.
    const handleHiringRequest = async (e, playerId, hiringId) => {
        const newStatus =
            e.currentTarget.textContent === '✅' ? 'aceptada' : 'rechazada';

        const body = await fetchData({
            url: `${VITE_API_URL}/api/players/${playerId}/hirings/${hiringId}`,
            method: 'PUT',
            body: { newStatus },
            authToken,
        });

        if (body) {
            updateHiringState(newStatus, hiringId);
            toast.success(body.message, { id: 'hiringRequestPage' });
        }
    };

    if (!authUser) {
        return <Navigate to="/" />;
    }

    return (
        <main className="hiring-request-page">
            <ul>
                {hiringRequests.length > 0 ? (
                    hiringRequests.map((request) => {
                        return (
                            <li key={request.id}>
                                <ul>
                                    <li>
                                        Jugador: {request.playerFirstName}{' '}
                                        {request.playerLastName}
                                    </li>
                                    {authUser.role === 'scout' ? (
                                        <>
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
                                        <li>
                                            Ojeador: {request.scoutUsername}
                                        </li>
                                    )}
                                    <li>
                                        Estado soliticud: {request.status}{' '}
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

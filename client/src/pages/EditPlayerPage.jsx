import { useContext, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import usePlayer from '../hooks/usePlayer';

import { AuthContext } from '../contexts/AuthContext';

import toast from 'react-hot-toast';
import useFetch from '../hooks/useFetch';

const { VITE_API_URL } = import.meta.env;

// Inicializamos el componente.
const EditPlayerPage = () => {
    const { authToken, authUser } = useContext(AuthContext);

    const { playerId } = useParams();

    const { player } = usePlayer(playerId);

    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        position: '',
        skills: '',
        team: '',
        strongFoot: '',
    });

    const { fetchData, loading } = useFetch();

    // Función genérica para manejar cambios en los inputs del formulario.
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    // Función que maneja el envío del formulario.
    const handleEditPlayer = async (e) => {
        e.preventDefault();

        const body = await fetchData({
            url: `${VITE_API_URL}/api/players/${playerId}`,
            method: 'PUT',
            body: formValues,
            authToken,
        });

        if (body) {
            toast.success(body.message, { id: 'editPlayerPage' });
            navigate(`/players/${playerId}`); // Redirige a la página de detalles del jugador
        }
    };

    // Si no estamos logueados redirigimos a la página principal.
    if (!authUser) {
        return <Navigate to="/" />;
    }

    return (
        <main>
            {
                // Si existe el jugador y el ID del usuario que creó el jugador coincide con el ID del
                // usuario del authToken mostramos el formulario de edición.
                player && player.familyUserId === authUser.id && (
                    <>
                        <h2>
                            Página de editar jugador: {player.firstName}{' '}
                            {player.lastName}
                        </h2>

                        <form onSubmit={handleEditPlayer}>
                            <label htmlFor="position">Posición:</label>
                            <input
                                type="text"
                                id="position"
                                name="position"
                                value={formValues.position}
                                onChange={handleChange}
                            />

                            <label htmlFor="skills">Habilidades:</label>
                            <textarea
                                name="skills"
                                id="skills"
                                value={formValues.skills}
                                onChange={handleChange}
                            ></textarea>

                            <label htmlFor="team">Equipo:</label>
                            <input
                                type="text"
                                id="team"
                                name="team"
                                value={formValues.team}
                                onChange={handleChange}
                            />

                            <fieldset>
                                <legend>Pierna dominante</legend>

                                <input
                                    type="radio"
                                    id="leftFoot"
                                    name="strongFoot"
                                    value="left"
                                    onChange={handleChange}
                                />
                                <label htmlFor="leftFoot">
                                    Pierna izquierda
                                </label>

                                <input
                                    type="radio"
                                    id="rightFoot"
                                    name="strongFoot"
                                    value="right"
                                    onChange={handleChange}
                                />
                                <label htmlFor="rightFoot">
                                    Pierna derecha
                                </label>

                                <input
                                    type="radio"
                                    id="dualFoot"
                                    name="strongFoot"
                                    value="dual"
                                    onChange={handleChange}
                                />
                                <label htmlFor="dualFoot">Ambidiestro</label>
                            </fieldset>

                            <button disabled={loading}>Editar jugador</button>
                        </form>
                    </>
                )
            }
        </main>
    );
};

export default EditPlayerPage;

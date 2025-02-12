// Importamos los hooks.
import { useContext, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import usePlayer from '../hooks/usePlayer';
import useFetch from '../hooks/useFetch';

// Importamos el contexto de autenticación.
import { AuthContext } from '../contexts/AuthContext';

// Importamos librerías externas.
import toast from 'react-hot-toast';

// Importamos las variables de entorno.
const { VITE_API_URL } = import.meta.env;

// Inicializamos el componente.
const EditPlayerPage = () => {
    // Extraemos valores del contexto de autenticación.
    const { authToken, authUser } = useContext(AuthContext);

    // Extraemos parámetros de la URL.
    const { playerId } = useParams();

    // Extraemos valores del hook `usePlayer`.
    const { player } = usePlayer(playerId);

    // Inicializamos el hook de navegación.
    const navigate = useNavigate();

    // Estado local para almacenar los valores del formulario.
    const [formValues, setFormValues] = useState({
        position: '',
        skills: '',
        team: '',
        strongFoot: '',
    });

    // Extraemos valores del hook `useFetch`.
    const { fetchData, loading } = useFetch();

    // Función genérica para manejar cambios en los inputs del formulario.
    const handleChange = (e) => {
        // Extraemos el nombre y valor del input.
        const { name, value } = e.target;

        // Actualizamos el estado con el nuevo valor del input.
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    // Función que maneja el envío del formulario.
    const handleEditPlayer = async (e) => {
        // Prevenimos la recarga de la página.
        e.preventDefault();

        // Realizamos la petición y obtenemos el body.
        const body = await fetchData({
            url: `${VITE_API_URL}/api/players/${playerId}`,
            method: 'PUT',
            body: formValues,
            authToken,
            toastId: 'editPlayerPage',
        });

        // Si la respuesta es válida, mostramos un mensaje y redirigimos a la página de detalles del jugador.
        if (body) {
            toast.success(body.message, { id: 'editPlayerPage' });
            navigate(`/players/${playerId}`);
        }
    };

    // Si el usuario no está autenticado, lo redirigimos a la página de inicio.
    if (!authUser) {
        return <Navigate to="/" />;
    }

    return (
        <main>
            {
                // Si existe el jugador y el ID del usuario que creó el jugador coincide con el ID del usuario autenticado, mostramos el formulario de edición.
                player && player.familyUserId === authUser.id && (
                    <>
                        <h2>
                            Página de editar jugador: {player.firstName}{' '}
                            {player.lastName}
                        </h2>

                        {/* Formulario de edición del jugador. */}
                        <form onSubmit={handleEditPlayer}>
                            {/* Campo posición. */}
                            <label htmlFor="position">Posición:</label>
                            <input
                                type="text"
                                id="position"
                                name="position"
                                value={formValues.position}
                                onChange={handleChange}
                            />

                            {/* Campo habilidades. */}
                            <label htmlFor="skills">Habilidades:</label>
                            <textarea
                                name="skills"
                                id="skills"
                                value={formValues.skills}
                                onChange={handleChange}
                            ></textarea>

                            {/* Campo equipo. */}
                            <label htmlFor="team">Equipo:</label>
                            <input
                                type="text"
                                id="team"
                                name="team"
                                value={formValues.team}
                                onChange={handleChange}
                            />

                            {/* Selección de pierna dominante. */}
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

                            {/* Botón de envío del formulario. */}
                            <button disabled={loading}>Editar jugador</button>
                        </form>
                    </>
                )
            }
        </main>
    );
};

export default EditPlayerPage;

// Importamos los hooks.
import { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

// Importamos el contexto de autenticación.
import { AuthContext } from '../contexts/AuthContext';

// Importamos librerías externas.
import toast from 'react-hot-toast';

// Importamos las variables de entorno.
const { VITE_API_URL } = import.meta.env;

// Inicializamos el componente.
const CreatePlayerPage = () => {
    // Extraemos valores del contexto de autenticación.
    const { authToken, authUser } = useContext(AuthContext);

    // Inicializamos el hook de navegación.
    const navigate = useNavigate();

    // Estado local para almacenar los valores del formulario.
    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        birthDate: '',
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
    const handleAddPlayer = async (e) => {
        // Prevenimos la recarga de la página.
        e.preventDefault();

        // Realizamos la petición y obtenemos el body.
        const body = await fetchData({
            url: `${VITE_API_URL}/api/players`,
            method: 'POST',
            body: formValues,
            authToken,
            toastId: 'createPlayerPage',
        });

        // Si la respuesta es válida, mostramos un mensaje y redirigimos a la página principal.
        if (body) {
            toast.success(body.message, { id: 'createPlayerPage' });
            navigate('/');
        }
    };

    // Si el usuario no está autenticado o no tiene rol de 'family', lo redirigimos a la página de inicio.
    if (!authUser || authUser.role !== 'family') {
        return <Navigate to="/" />;
    }

    return (
        <main>
            <h2>Página de creación de jugador</h2>

            {/* Formulario de creación de jugador. */}
            <form onSubmit={handleAddPlayer}>
                {/* Campo nombre. */}
                <label htmlFor="firstName">Nombre:</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formValues.firstName}
                    onChange={handleChange}
                    autoFocus
                    required
                />

                {/* Campo apellidos. */}
                <label htmlFor="lastName">Apellidos:</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formValues.lastName}
                    onChange={handleChange}
                    required
                />

                {/* Campo fecha de nacimiento. */}
                <label htmlFor="birthDate">Fecha de nacimiento:</label>
                <input
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    value={formValues.birthDate}
                    onChange={handleChange}
                    required
                />

                {/* Campo posición. */}
                <label htmlFor="position">Posición:</label>
                <input
                    type="text"
                    id="position"
                    name="position"
                    value={formValues.position}
                    onChange={handleChange}
                    required
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
                        value="izquierda"
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="leftFoot">Pierna izquierda</label>

                    <input
                        type="radio"
                        id="rightFoot"
                        name="strongFoot"
                        value="derecha"
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="rightFoot">Pierna derecha</label>

                    <input
                        type="radio"
                        id="dualFoot"
                        name="strongFoot"
                        value="ambidiestro"
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="dualFoot">Ambidiestro</label>
                </fieldset>

                {/* Botón de envío del formulario. */}
                <button disabled={loading}>Crear jugador</button>
            </form>
        </main>
    );
};

export default CreatePlayerPage;

import { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

import { AuthContext } from '../contexts/AuthContext';

import toast from 'react-hot-toast';

const { VITE_API_URL } = import.meta.env;

// Inicializamos el componente.
const CreatePlayerPage = () => {
    const { authToken, authUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        birthDate: '',
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
    const handleAddPlayer = async (e) => {
        e.preventDefault();

        const body = await fetchData({
            url: `${VITE_API_URL}/api/players`,
            method: 'POST',
            body: formValues,
            authToken,
        });

        toast.success(body.message, {
            id: 'createPlayerPage',
        });

        navigate('/');
    };

    if (!authUser || authUser.role !== 'family') {
        return <Navigate to="/" />;
    }

    return (
        <main>
            <h2>Página de creación de jugador</h2>

            <form onSubmit={handleAddPlayer}>
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

                <label htmlFor="lastName">Apellidos:</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formValues.lastName}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="birthDate">Fecha de nacimiento:</label>
                <input
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    value={formValues.birthDate}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="position">Posición:</label>
                <input
                    type="text"
                    id="position"
                    name="position"
                    value={formValues.position}
                    onChange={handleChange}
                    required
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
                        id="ambidiestro"
                        name="strongFoot"
                        value="dual"
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="ambidiestro">Ambidiestro</label>
                </fieldset>

                <button disabled={loading}>Crear jugador</button>
            </form>
        </main>
    );
};

export default CreatePlayerPage;

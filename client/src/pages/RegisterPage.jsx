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
const RegisterPage = () => {
    // Extraemos valores del contexto de autenticación.
    const { authUser } = useContext(AuthContext);

    // Inicializamos el hook de navegación.
    const navigate = useNavigate();

    // Estado local para almacenar los valores del formulario.
    const [formValues, setFormValues] = useState({
        username: '',
        firstName: '',
        lastName: '',
        birthDate: '',
        email: '',
        password: '',
        repeatedPass: '',
        role: '',
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
    const handleRegisterUser = async (e) => {
        // Prevenimos la recarga de la página.
        e.preventDefault();

        // Validamos que las contraseñas coincidan.
        if (formValues.password !== formValues.repeatedPass) {
            toast.error('Las contraseñas no coinciden', { id: 'registerPage' });
            return;
        }

        // Realizamos la petición y obtenemos el body.
        const body = await fetchData({
            url: `${VITE_API_URL}/api/users/register`,
            method: 'POST',
            body: formValues,
            toastId: 'registerPage',
        });

        // Si la respuesta es válida, mostramos un mensaje y redirigimos al login.
        if (body) {
            toast.success(body.message, { id: 'registerPage' });
            navigate('/login');
        }
    };

    // Si el usuario ya está autenticado, lo redirigimos a la página de inicio.
    if (authUser) {
        return <Navigate to="/" />;
    }

    return (
        <main>
            <h2>Página de registro</h2>

            {/* Formulario de registro. */}
            <form onSubmit={handleRegisterUser}>
                {/* Campo username. */}
                <label htmlFor="username">Usuario:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    autoFocus
                    autoComplete="username"
                    value={formValues.username}
                    onChange={handleChange}
                    required
                />

                {/* Campo email. */}
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    value={formValues.email}
                    onChange={handleChange}
                    required
                />

                {/* Campo nombre. */}
                <label htmlFor="firstName">Nombre:</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    autoComplete="given-name"
                    value={formValues.firstName}
                    onChange={handleChange}
                    required
                />

                {/* Campo apellidos. */}
                <label htmlFor="lastName">Apellidos:</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    autoComplete="family-name"
                    value={formValues.lastName}
                    onChange={handleChange}
                    required
                />

                {/* Campo fecha de nacimiento. */}
                <label htmlFor="birthDate">Fecha nacimiento:</label>
                <input
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    autoComplete="bday"
                    value={formValues.birthDate}
                    onChange={handleChange}
                    required
                />

                {/* Campo contraseña. */}
                <label htmlFor="password">Contraseña:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="new-password"
                    value={formValues.password}
                    onChange={handleChange}
                    required
                />

                {/* Campo repetir contraseña. */}
                <label htmlFor="repeatedPass">Repetir contraseña:</label>
                <input
                    type="password"
                    id="repeatedPass"
                    name="repeatedPass"
                    autoComplete="new-password"
                    value={formValues.repeatedPass}
                    onChange={handleChange}
                    required
                />

                {/* Campo rol. */}
                <label htmlFor="role">Rol:</label>
                <select
                    id="role"
                    name="role"
                    autoComplete="off"
                    value={formValues.role}
                    onChange={handleChange}
                    required
                >
                    <option value="">--Seleccionar--</option>
                    <option value="family">Familia</option>
                    <option value="scout">Ojeador</option>
                </select>

                {/* Botón de envío del formulario. */}
                <button disabled={loading}>Registrarse</button>
            </form>
        </main>
    );
};

export default RegisterPage;

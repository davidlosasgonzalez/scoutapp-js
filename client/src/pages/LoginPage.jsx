// Importamos los hooks.
import { useState, useContext } from 'react';
import useFetch from '../hooks/useFetch';

// Importamos los componentes.
import { Navigate } from 'react-router-dom';

// Importamos el contexto de autenticación.
import { AuthContext } from '../contexts/AuthContext';

// Importamos las variables de entorno.
const { VITE_API_URL } = import.meta.env;

// Inicializamos el componente.
const LoginPage = () => {
    // Extraemos valores del contexto de autenticación.
    const { authUser, authLoginState } = useContext(AuthContext);

    // Estado local para almacenar los valores del formulario.
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
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
    const handleLoginUser = async (e) => {
        // Prevenimos la recarga de la página.
        e.preventDefault();

        // Realizamos la petición y obtenemos el body.
        const body = await fetchData({
            url: `${VITE_API_URL}/api/users/login`,
            method: 'POST',
            body: formValues,
            toastId: 'loginPage',
            showToast: false,
        });

        // Si la respuesta es válida, actualizamos el estado de autenticación.
        if (body) {
            authLoginState(body.data.token);
        }
    };

    // Si el usuario ya está autenticado, lo redirigimos a la página de inicio.
    if (authUser) {
        return <Navigate to="/" />;
    }

    return (
        <main>
            <h2>Página de login</h2>

            {/* Formulario de autenticación. */}
            <form onSubmit={handleLoginUser}>
                {/* Campo email. */}
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    value={formValues.email}
                    onChange={handleChange}
                    autoFocus
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

                {/* Botón de envío del formulario. */}
                <button disabled={loading}>Loguearse</button>
            </form>
        </main>
    );
};

// Exportamos el componente.
export default LoginPage;

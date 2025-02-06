import { useState, useContext } from 'react';
import useFetch from '../hooks/useFetch';

import { Navigate } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthContext';

const { VITE_API_URL } = import.meta.env;

// Inicializamos el componente.
const LoginPage = () => {
    const { authUser, authLoginState } = useContext(AuthContext);

    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
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
    const handleLoginUser = async (e) => {
        e.preventDefault();

        const body = await fetchData({
            url: `${VITE_API_URL}/api/users/login`,
            method: 'POST',
            body: formValues,
            showToast: false,
        });

        if (body) {
            authLoginState(body.data.authToken);
        }
    };

    if (authUser) {
        return <Navigate to="/" />;
    }

    return (
        <main>
            <h2>Página de login</h2>

            <form onSubmit={handleLoginUser}>
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

                <button disabled={loading}>Loguearse</button>
            </form>
        </main>
    );
};

export default LoginPage;

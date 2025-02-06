import { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

import { AuthContext } from '../contexts/AuthContext';

import toast from 'react-hot-toast';

const { VITE_API_URL } = import.meta.env;

// Inicializamos el componente.
const RegisterPage = () => {
    const { authUser } = useContext(AuthContext);

    const navigate = useNavigate();

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
    const handleRegisterUser = async (e) => {
        e.preventDefault();

        if (formValues.password !== formValues.repeatedPass) {
            toast.error('Las contraseñas no coinciden', { id: 'registerPage' });
            return;
        }

        const body = await fetchData({
            url: `${VITE_API_URL}/api/users/register`,
            method: 'POST',
            body: formValues,
        });

        if (body) {
            toast.success(body.message, { id: 'registerPage' });
            navigate('/login');
        }
    };

    if (authUser) {
        return <Navigate to="/" />;
    }

    return (
        <main>
            <h2>Página de registro</h2>

            <form onSubmit={handleRegisterUser}>
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

                <button disabled={loading}>Registrarse</button>
            </form>
        </main>
    );
};

export default RegisterPage;

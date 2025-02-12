// Importamos librerías externas.
import PropTypes from 'prop-types';
import cookies from 'js-cookie';

// Importamos los hooks.
import { createContext, useEffect, useState } from 'react';

// Importamos las variables de entorno.
const { VITE_AUTH_TOKEN, VITE_API_URL } = import.meta.env;

// Inicializamos el contexto de autenticación.
const AuthContext = createContext(null);

// Inicializamos el provider del contexto de autenticación.
const AuthProvider = ({ children }) => {
    // Estado para almacenar el token de autenticación.
    const [authToken, setAuthToken] = useState(
        cookies.get(VITE_AUTH_TOKEN) || null,
    );

    // Estado para almacenar la información del usuario autenticado.
    const [authUser, setAuthUser] = useState(null);

    // Efecto para obtener la información del usuario cuando `authToken` cambia.
    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Realizamos la petición para obtener los datos del usuario autenticado.
                const res = await fetch(`${VITE_API_URL}/api/users`, {
                    headers: {
                        Authorization: authToken,
                    },
                });

                const body = await res.json();

                // Si hay un error en la respuesta, lanzamos una excepción.
                if (body.status === 'error') {
                    throw new Error(body.message);
                }

                // Actualizamos el estado con la información del usuario.
                setAuthUser(body.data.user);
            } catch (err) {
                console.error(err.message);

                // Si hay un error, cerramos la sesión.
                authLogoutState();
            }
        };

        // Solo realizamos la petición si hay un `authToken` válido.
        if (authToken) {
            fetchUser();
        }
    }, [authToken]);

    // Función para iniciar sesión y almacenar el token.
    const authLoginState = (newToken) => {
        setAuthToken(newToken);
        cookies.set(VITE_AUTH_TOKEN, newToken);
    };

    // Función para cerrar sesión y limpiar el estado.
    const authLogoutState = () => {
        setAuthUser(null);
        setAuthToken(null);
        cookies.remove(VITE_AUTH_TOKEN);
    };

    // Función para actualizar la información del usuario autenticado.
    const authUpdateProfileState = (updatedUserData) => {
        setAuthUser({
            ...authUser,
            ...updatedUserData,
        });
    };

    return (
        <AuthContext.Provider
            value={{
                authToken,
                authUser,
                authLoginState,
                authLogoutState,
                authUpdateProfileState,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Definimos las validaciones de las props.
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };

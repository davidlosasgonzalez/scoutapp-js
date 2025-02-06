import PropTypes from 'prop-types';
import cookies from 'js-cookie';

import { createContext, useEffect, useState } from 'react';

const { VITE_AUTH_TOKEN, VITE_API_URL } = import.meta.env;

// Contexto.
const AuthContext = createContext(null);

// Componente provider.
const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(
        cookies.get(VITE_AUTH_TOKEN) || null,
    );
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`${VITE_API_URL}/api/users`, {
                    headers: {
                        Authorization: authToken,
                    },
                });

                const body = await res.json();

                if (body.status === 'error') {
                    throw new Error(body.message);
                }

                setAuthUser(body.data.user);
            } catch (err) {
                console.error(err.message);

                authLogoutState();
            }
        };

        if (authToken) {
            fetchUser();
        }
    }, [authToken]);

    const authLoginState = (newToken) => {
        setAuthToken(newToken);
        cookies.set(VITE_AUTH_TOKEN, newToken);
    };

    const authLogoutState = () => {
        setAuthUser(null);
        setAuthToken(null);
        cookies.remove(VITE_AUTH_TOKEN);
    };

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

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };

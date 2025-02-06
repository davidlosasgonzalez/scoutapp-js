import { useContext } from 'react';

import { Link } from 'react-router-dom';

import Avatar from './Avatar';

import { AuthContext } from '../contexts/AuthContext';

// Inicializamos el componente.
const Header = () => {
    const { authUser, authLogoutState } = useContext(AuthContext);

    return (
        <header>
            <h1>
                <Link to="/">ScoutApp</Link>
            </h1>

            {authUser && (
                <div className="user-info">
                    <p>
                        @{authUser.username} ({authUser.role})
                    </p>
                    <Avatar
                        avatar={authUser.avatar}
                        username={authUser.username}
                    />
                </div>
            )}

            <nav>
                <ul>
                    {!authUser ? (
                        <>
                            <li>
                                <Link to="/register">Registro</Link>
                            </li>
                            <li>
                                <Link to="/login">Loguin</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            {authUser.role === 'family' && (
                                <li>
                                    <Link to="/players/create">
                                        Añadir Jugador
                                    </Link>
                                </li>
                            )}
                            <li>
                                <Link to="/users/hirings">Contrataciones</Link>
                            </li>
                            <li>
                                <Link to="/users/private">Mi Perfil</Link>
                            </li>
                            <li>
                                <button onClick={authLogoutState}>
                                    Cerrar Sesión
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;

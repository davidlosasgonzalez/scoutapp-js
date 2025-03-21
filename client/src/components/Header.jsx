// Importamos los hooks.
import { useSelector, useDispatch } from 'react-redux';

// Importamos los componentes.
import { Link } from 'react-router-dom';
import Avatar from './Avatar';

// Importamos las acciones de Redux.
import { logoutUser } from '../redux/slices/auth';

// Inicializamos el componente.
const Header = () => {
    // Extraemos valores del estado de autenticación desde Redux.
    const { authUser } = useSelector((state) => state.auth);

    // Inicializamos el hook de Redux para enviar acciones.
    const dispatch = useDispatch();

    return (
        <header>
            {/* Logo y enlace a la página principal. */}
            <h1>
                <Link to="/">ScoutApp</Link>
            </h1>

            {/* Si el usuario está autenticado, mostramos su información. */}
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

            {/* Menú de navegación. */}
            <nav>
                <ul>
                    {!authUser ? (
                        <>
                            {/* Enlaces para usuarios no autenticados. */}
                            <li>
                                <Link to="/register">Registro</Link>
                            </li>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            {/* Enlace para agregar un jugador (solo para `family`). */}
                            {authUser.role === 'family' && (
                                <li>
                                    <Link to="/players/create">
                                        Añadir Jugador
                                    </Link>
                                </li>
                            )}

                            {/* Enlace a las contrataciones. */}
                            <li>
                                <Link to="/users/hirings">Contrataciones</Link>
                            </li>

                            {/* Enlace al perfil privado del usuario. */}
                            <li>
                                <Link to="/users/private">Mi Perfil</Link>
                            </li>

                            {/* Botón para cerrar sesión. */}
                            <li>
                                <button onClick={() => dispatch(logoutUser())}>
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

// Exportamos el componente.
export default Header;

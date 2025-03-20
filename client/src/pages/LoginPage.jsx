// Importamos los hooks.
import { useDispatch, useSelector } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';

// Importamos los componentes.
import Input from '../components/Input';

// Importamos las acciones de Redux.
import { loginUser } from '../redux/slices/authSlice';

// Importamos librerías externas.
import toast from 'react-hot-toast';

// Inicializamos el componente.
const LoginPage = () => {
    // Inicializamos el hook de Redux para enviar acciones.
    const dispatch = useDispatch();

    // Inicializamos el hook de navegación.
    const navigate = useNavigate();

    // Extraemos valores del estado de autenticación desde Redux.
    const { authUser, loading } = useSelector((state) => state.auth);

    // Configuración del formulario con `react-hook-form`.
    const methods = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    // Extraemos el método handleSubmit.
    const { handleSubmit } = methods;

    // Función que maneja el envío del formulario.
    const onSubmit = async (data) => {
        const action = await dispatch(loginUser(data));

        if (loginUser.fulfilled.match(action)) {
            toast.success('Inicio de sesión exitoso', { id: 'loginPage' });
            navigate('/');
        }
    };

    // Si el usuario ya está autenticado, lo redirigimos a la página de inicio.
    if (authUser) {
        return <Navigate to="/" />;
    }

    return (
        <main>
            <h2>Página de login</h2>

            {/* Utilizamos FormProvider para proporcionar los métodos de react-hook-form */}
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Campo email. */}
                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        aria-label="Correo electrónico"
                        required
                    />
                    {/* Campo contraseña. */}
                    <Input
                        label="Contraseña"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        aria-label="Contraseña"
                        required
                    />
                    {/* Botón de envío del formulario. */}
                    <button
                        type="submit"
                        disabled={loading}
                        aria-disabled={loading}
                    >
                        Loguearse
                    </button>
                </form>
            </FormProvider>
        </main>
    );
};

// Exportamos el componente.
export default LoginPage;

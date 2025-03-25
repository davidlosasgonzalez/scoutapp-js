// Importamos los hooks de Redux y React.
import { useDispatch, useSelector } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';

// Importamos el hook de navegación de Next.js.
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// Importamos los componentes personalizados.
import Input from '@/components/Input';

// Importamos la acción de Redux para iniciar sesión.
import { loginUser } from '@/redux/slices/auth';

// Importamos librerías externas.
import toast from 'react-hot-toast';

// Inicializamos el componente.
const LoginPage = () => {
    // Hook de navegación de Next.js.
    const router = useRouter();

    // Hook de Redux para enviar acciones.
    const dispatch = useDispatch();

    // Extraemos el estado de autenticación desde Redux.
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
            router.push('/');
        }
    };

    // Redirigimos automáticamente si el usuario ya está autenticado.
    useEffect(() => {
        if (authUser) {
            router.replace('/');
        }
    }, [authUser, router]);

    return (
        <main>
            <h2>Página de login</h2>

            {/* Proveemos los métodos del formulario a los inputs personalizados. */}
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

// Importamos los hooks.
import { useForm, FormProvider } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

// Importamos el hook de navegación de Next.js.
import { useRouter } from 'next/router';

// Importamos el componente Input.
import Input from '@/components/Input';

// Importamos la acción de Redux para registrar un usuario.
import { registerUser } from '@/redux/slices/auth';

// Importamos librerías externas.
import toast from 'react-hot-toast';
import { useEffect } from 'react';

// Inicializamos el componente.
const RegisterPage = () => {
    // Inicializamos el hook de Redux para enviar acciones.
    const dispatch = useDispatch();

    // Hook de navegación de Next.js.
    const router = useRouter();

    // Extraemos valores del estado de autenticación desde Redux.
    const { authUser, loading } = useSelector((state) => state.auth);

    // Configuración del formulario con react-hook-form.
    const methods = useForm({
        defaultValues: {
            username: '',
            firstName: '',
            lastName: '',
            birthDate: '',
            email: '',
            password: '',
            repeatedPass: '',
            role: '',
        },
    });

    const { handleSubmit } = methods;

    // Función que maneja el envío del formulario.
    const onSubmit = async (data) => {
        if (data.password !== data.repeatedPass) {
            toast.error('Las contraseñas no coinciden', { id: 'registerPage' });
            return;
        }

        const action = await dispatch(registerUser(data));

        if (registerUser.fulfilled.match(action)) {
            router.push('/login');
        }
    };

    // Si el usuario ya está autenticado, lo redirigimos a la página de inicio.
    useEffect(() => {
        if (authUser) {
            router.replace('/');
        }
    }, [authUser, router]);

    // Evitamos renderizar si ya está autenticado.
    if (authUser) return null;

    return (
        <main>
            <h2>Página de registro</h2>

            {/* Proveemos los métodos de react-hook-form a los inputs */}
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Campo usuario */}
                    <Input
                        label="Usuario"
                        name="username"
                        type="text"
                        autoComplete="username"
                        aria-label="Nombre de usuario"
                        required
                    />
                    {/* Campo email */}
                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        aria-label="Correo electrónico"
                        required
                    />
                    {/* Campo nombre */}
                    <Input
                        label="Nombre"
                        name="firstName"
                        type="text"
                        autoComplete="given-name"
                        aria-label="Nombre"
                        required
                    />
                    {/* Campo apellidos */}
                    <Input
                        label="Apellidos"
                        name="lastName"
                        type="text"
                        autoComplete="family-name"
                        aria-label="Apellidos"
                        required
                    />
                    {/* Campo fecha de nacimiento */}
                    <Input
                        label="Fecha de nacimiento"
                        name="birthDate"
                        type="date"
                        autoComplete="bday"
                        aria-label="Fecha de nacimiento"
                        required
                    />
                    {/* Campo contraseña */}
                    <Input
                        label="Contraseña"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        aria-label="Contraseña"
                        required
                    />
                    {/* Campo repetir contraseña */}
                    <Input
                        label="Repetir contraseña"
                        name="repeatedPass"
                        type="password"
                        autoComplete="new-password"
                        aria-label="Repetir contraseña"
                        required
                    />
                    {/* Campo rol (select) */}
                    <fieldset>
                        <legend>Selecciona tu rol</legend>
                        <label htmlFor="role">Rol:</label>
                        <select
                            id="role"
                            name="role"
                            aria-label="Selecciona tu rol"
                            {...methods.register('role', { required: true })}
                        >
                            <option value="">--Seleccionar--</option>
                            <option value="family">Familia</option>
                            <option value="scout">Ojeador</option>
                        </select>
                    </fieldset>
                    {/* Botón de envío del formulario */}
                    <button
                        type="submit"
                        disabled={loading}
                        aria-disabled={loading}
                    >
                        Registrarse
                    </button>
                </form>
            </FormProvider>
        </main>
    );
};

// Exportamos el componente.
export default RegisterPage;

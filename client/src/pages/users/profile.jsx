// Importamos los hooks.
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';

// Importamos el hook de navegación de Next.js.
import { useRouter } from 'next/router';

// Importamos los componentes personalizados.
import Avatar from '@/components/Avatar';
import Input from '@/components/Input';

// Importamos las acciones de Redux.
import { updateAuthField, uploadAuthAvatar } from '@/redux/slices/auth';

// Función para inicializar el formulario con los datos del usuario.
const initializeForm = (authUser, reset) => {
    if (authUser) {
        reset({
            username: authUser.username,
            email: authUser.email,
        });
    }
};

// Inicializamos el componente.
const PrivateProfilePage = () => {
    // Hook de navegación de Next.js.
    const router = useRouter();

    // Hook de Redux para enviar acciones.
    const dispatch = useDispatch();

    // Extraemos el estado de autenticación desde Redux.
    const { authUser, loading } = useSelector((state) => state.auth);

    // Referencia al input de subida de archivos (avatar).
    const fileInputRef = useRef(null);

    // Estado para controlar qué campo está en modo edición.
    const [editingField, setEditingField] = useState(null);

    // Configuración del formulario con react-hook-form.
    const methods = useForm({
        defaultValues: {
            username: '',
            email: '',
        },
    });

    // Extraemos métodos útiles del formulario.
    const { reset, getValues, setValue } = methods;

    // Cargamos los datos del usuario al montar el componente.
    useEffect(() => {
        initializeForm(authUser, reset);
    }, [authUser, reset]);

    // Redirigimos si el usuario no está autenticado.
    useEffect(() => {
        if (!authUser) {
            router.replace('/');
        }
    }, [authUser, router]);

    // Si todavía no tenemos el usuario cargado, evitamos renderizar el contenido.
    if (!authUser) return null;

    return (
        <main>
            <h2>Página de perfil privado</h2>

            {/* Proveemos los métodos del formulario a los inputs personalizados. */}
            <FormProvider {...methods}>
                <form>
                    {/* Sección del avatar con funcionalidad de subida. */}
                    <div className="avatar-container">
                        <Avatar
                            avatar={authUser.avatar}
                            username={authUser.username}
                            onClick={() => fileInputRef.current?.click()}
                        />
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) dispatch(uploadAuthAvatar(file));
                            }}
                            style={{ display: 'none' }}
                        />
                    </div>

                    {/* Campo nombre de usuario editable. */}
                    <div className="input-group">
                        <Input
                            label="Usuario"
                            type="text"
                            name="username"
                            onChange={(e) =>
                                setValue('username', e.target.value)
                            }
                            disabled={editingField !== 'username'}
                        />
                        {editingField === 'username' ? (
                            <button
                                type="button"
                                onClick={() => {
                                    const value = getValues('username');
                                    dispatch(
                                        updateAuthField({
                                            field: 'username',
                                            value,
                                        }),
                                    );
                                    setEditingField(null);
                                }}
                                disabled={loading}
                            >
                                Guardar
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setEditingField('username')}
                            >
                                Editar
                            </button>
                        )}
                    </div>

                    {/* Campo email editable. */}
                    <div className="input-group">
                        <Input
                            label="Email"
                            type="text"
                            name="email"
                            onChange={(e) => setValue('email', e.target.value)}
                            disabled={editingField !== 'email'}
                        />
                        {editingField === 'email' ? (
                            <button
                                type="button"
                                onClick={() => {
                                    const value = getValues('email');
                                    dispatch(
                                        updateAuthField({
                                            field: 'email',
                                            value,
                                        }),
                                    );
                                    setEditingField(null);
                                }}
                                disabled={loading}
                            >
                                Guardar
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setEditingField('email')}
                            >
                                Editar
                            </button>
                        )}
                    </div>
                </form>
            </FormProvider>
        </main>
    );
};

// Exportamos el componente.
export default PrivateProfilePage;

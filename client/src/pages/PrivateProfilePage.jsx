// Importamos los hooks.
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';

// Importamos los componentes.
import { Navigate } from 'react-router-dom';
import Avatar from '../components/Avatar';
import Input from '../components/Input';

// Importamos las acciones de Redux.
import { updateAuthField, uploadAuthAvatar } from '../redux/slices/auth';

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
    // Inicializamos el hook de Redux para enviar acciones.
    const dispatch = useDispatch();

    // Extraemos valores del estado de autenticación desde Redux.
    const { authUser, loading } = useSelector((state) => state.auth);

    // Referencia para el input de subida de archivos (avatar).
    const fileInputRef = useRef(null);

    // Estado para controlar qué campo está en modo edición.
    const [editingField, setEditingField] = useState(null);

    // Configuración del formulario con `react-hook-form`.
    const methods = useForm({
        defaultValues: {
            username: '',
            email: '',
        },
    });

    // Extraemos métodos útiles de `react-hook-form`.
    const { reset, getValues, setValue } = methods;

    // Cargamos los datos del usuario en el formulario cuando `authUser` esté disponible.
    useEffect(() => {
        initializeForm(authUser, reset);
    }, [authUser, reset]);

    // Si el usuario no está autenticado, lo redirigimos a la página de inicio.
    if (!authUser) return <Navigate to="/" />;

    return (
        <main>
            <h2>Página de perfil privado</h2>

            {/* Utilizamos `FormProvider` para proporcionar los métodos de `react-hook-form`. */}
            <FormProvider {...methods}>
                <form>
                    {/* Sección del avatar. */}
                    <div className="avatar-container">
                        <Avatar
                            avatar={authUser.avatar}
                            username={authUser.username}
                            // Permite cambiar avatar al hacer clic.
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
                            // Ocultamos el input de subida de archivos.
                            style={{ display: 'none' }}
                        />
                    </div>

                    {/* Campo username con botón de edición. */}
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

                    {/* Campo email con botón de edición. */}
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

export default PrivateProfilePage;

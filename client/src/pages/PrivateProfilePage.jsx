import { useContext, useEffect, useRef, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import useFetch from '../hooks/useFetch';
import { Navigate } from 'react-router-dom';
import Input from '../components/Input';
import { AuthContext } from '../contexts/AuthContext';
import Avatar from '../components/Avatar';

const { VITE_API_URL } = import.meta.env;

// Inicializamos el componente.
const PrivateProfilePage = () => {
    const { authToken, authUser, authUpdateProfileState } =
        useContext(AuthContext);

    const { fetchData, loading } = useFetch();

    const fileInputRef = useRef(null);

    const [editingField, setEditingField] = useState(null);

    // Configuración del formulario
    const methods = useForm({
        defaultValues: {
            username: '',
            email: '',
        },
    });

    const { reset, getValues, setValue } = methods;

    // Cargar los valores del usuario cuando authUser esté disponible
    useEffect(() => {
        if (authUser) {
            reset({
                username: authUser?.username,
                email: authUser?.email,
            });
        }
    }, [authUser, reset]);

    // Función para actualizar un solo campo
    const handleUpdateField = async (field) => {
        const value = getValues(field);

        const body = await fetchData({
            url: `${VITE_API_URL}/api/users`,
            method: 'PUT',
            body: { [field]: value },
            authToken,
            headers: {
                'Content-Type': 'application/json',
            },
            toastId: 'privateProfilePage',
        });

        if (body?.status === 'ok') {
            authUpdateProfileState(body.data.user);
            setEditingField(null);
        }
    };

    // Función para subir avatar automáticamente al seleccionar un archivo
    const handleAvatarUpload = async (event) => {
        const file = event.target.files[0];

        if (!file) return;

        const formData = new FormData();

        formData.append('avatar', file);

        const body = await fetchData({
            url: `${VITE_API_URL}/api/users/avatar`,
            method: 'PUT',
            body: formData,
            authToken,
            isFormData: true,
            toastId: 'privateProfilePage',
        });

        if (body?.status === 'ok') {
            authUpdateProfileState(body.data.user);
        }
    };

    // Si no estamos logueados redirigimos a la página principal.
    if (!authUser) return <Navigate to="/" />;

    return (
        <main>
            <h2>Página de perfil privado</h2>

            <FormProvider {...methods}>
                <form>
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
                            onChange={handleAvatarUpload}
                            style={{ display: 'none' }} // Oculta el input
                        />
                    </div>

                    {/* Campo Username con botón de edición */}
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
                                onClick={() => handleUpdateField('username')}
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

                    {/* Campo Email con botón de edición */}
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
                                onClick={() => handleUpdateField('email')}
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

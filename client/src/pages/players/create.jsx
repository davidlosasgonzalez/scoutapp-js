// Importamos los hooks.
import { useDispatch, useSelector } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { useRouter } from 'next/router';

// Importamos los componentes.
import Input from '@/components/Input';

// Importamos la acción de Redux para crear un jugador del slice unificado de players.
import { createPlayer } from '@/redux/slices/players';

// Inicializamos el componente.
const CreatePlayerPage = () => {
    // Inicializamos el hook de Redux para enviar acciones.
    const dispatch = useDispatch();

    // Inicializamos el hook de navegación de Next.js.
    const router = useRouter();

    // Extraemos authToken y authUser desde Redux.
    const { authToken, authUser } = useSelector((state) => state.auth);

    // Extraemos el estado de creación de jugador desde el slice de players.
    const { loading } = useSelector((state) => state.players);

    // Configuración del formulario con react-hook-form.
    const methods = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            birthDate: '',
            position: '',
            skills: '',
            team: '',
            strongFoot: '',
        },
    });
    const { handleSubmit } = methods;

    // Función que maneja el envío del formulario.
    const onSubmit = (data) => {
        dispatch(createPlayer({ formValues: data, authToken })).then(
            (action) => {
                // Si la creación fue exitosa, redirigimos a la página principal.
                if (createPlayer.fulfilled.match(action)) {
                    router.push('/');
                }
            },
        );
    };

    // Si el usuario no está autenticado o no tiene rol 'family', lo redirigimos a la página de inicio.
    if (
        typeof window !== 'undefined' &&
        (!authUser || authUser.role !== 'family')
    ) {
        router.push('/');
        return null;
    }

    return (
        <main>
            <h2>Página de creación de jugador</h2>

            {/* Utilizamos FormProvider para proporcionar los métodos de react-hook-form a los inputs */}
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Campo Nombre */}
                    <Input
                        label="Nombre"
                        name="firstName"
                        type="text"
                        autoComplete="given-name"
                        aria-label="Nombre"
                        required
                    />

                    {/* Campo Apellidos */}
                    <Input
                        label="Apellidos"
                        name="lastName"
                        type="text"
                        autoComplete="family-name"
                        aria-label="Apellidos"
                        required
                    />

                    {/* Campo Fecha de nacimiento */}
                    <div className="input-group">
                        <label htmlFor="birthDate">Fecha de nacimiento:</label>
                        <input
                            id="birthDate"
                            type="date"
                            {...methods.register('birthDate', {
                                required: true,
                            })}
                            autoComplete="bday"
                            aria-label="Fecha de nacimiento"
                            required
                        />
                    </div>

                    {/* Campo Posición */}
                    <Input
                        label="Posición"
                        name="position"
                        type="text"
                        autoComplete="off"
                        aria-label="Posición"
                        required
                    />

                    {/* Campo Habilidades */}
                    <div className="input-group">
                        <label htmlFor="skills">Habilidades:</label>
                        <textarea
                            id="skills"
                            {...methods.register('skills')}
                            aria-label="Habilidades"
                        ></textarea>
                    </div>

                    {/* Campo Equipo */}
                    <Input
                        label="Equipo"
                        name="team"
                        type="text"
                        autoComplete="off"
                        aria-label="Equipo"
                    />

                    {/* Selección de pierna dominante */}
                    <fieldset>
                        <legend>Pierna dominante</legend>
                        <div className="input-group">
                            <input
                                type="radio"
                                id="leftFoot"
                                value="izquierda"
                                {...methods.register('strongFoot', {
                                    required: true,
                                })}
                            />
                            <label htmlFor="leftFoot">Pierna izquierda</label>
                        </div>
                        <div className="input-group">
                            <input
                                type="radio"
                                id="rightFoot"
                                value="derecha"
                                {...methods.register('strongFoot', {
                                    required: true,
                                })}
                            />
                            <label htmlFor="rightFoot">Pierna derecha</label>
                        </div>
                        <div className="input-group">
                            <input
                                type="radio"
                                id="dualFoot"
                                value="dual"
                                {...methods.register('strongFoot', {
                                    required: true,
                                })}
                            />
                            <label htmlFor="dualFoot">Ambidiestro</label>
                        </div>
                    </fieldset>

                    {/* Botón de envío del formulario */}
                    <button
                        type="submit"
                        disabled={loading}
                        aria-disabled={loading}
                    >
                        Crear jugador
                    </button>
                </form>
            </FormProvider>
        </main>
    );
};

export default CreatePlayerPage;

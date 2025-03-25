// Importamos los hooks.
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { useRouter } from 'next/router';

// Importamos el componente Input.
import Input from '@/components/Input';

// Importamos las acciones de Redux para obtener y actualizar un jugador.
import { fetchPlayerById, updatePlayer } from '@/redux/slices/players';

// Inicializamos el componente.
const EditPlayerPage = () => {
    // Inicializamos el hook de navegación.
    const router = useRouter();

    // Extraemos playerId de los parámetros de la URL.
    const { playerId } = router.query;

    // Inicializamos el hook de Redux para enviar acciones.
    const dispatch = useDispatch();

    // Extraemos authToken y authUser desde Redux.
    const { authToken, authUser } = useSelector((state) => state.auth);

    // Extraemos el jugador actual y el estado de carga del slice de jugadores.
    const { currentPlayer: player, loading } = useSelector(
        (state) => state.players,
    );

    // Configuración del formulario con react-hook-form.
    const methods = useForm({
        defaultValues: {
            position: '',
            skills: '',
            team: '',
            strongFoot: '',
        },
    });

    const { handleSubmit, reset } = methods;

    // Al montar el componente, obtenemos el jugador por ID y reiniciamos el formulario con sus datos.
    useEffect(() => {
        if (playerId) {
            if (!player || player.id !== Number(playerId)) {
                dispatch(fetchPlayerById(playerId));
            } else {
                reset({
                    position: player.position || '',
                    skills: player.skills || '',
                    team: player.team || '',
                    strongFoot: player.strongFoot || '',
                });
            }
        }
    }, [dispatch, player, playerId, reset]);

    // Función que maneja el envío del formulario.
    const onSubmit = async (data) => {
        const action = await dispatch(
            updatePlayer({ playerId, formValues: data, authToken }),
        );

        if (updatePlayer.fulfilled.match(action)) {
            router.push(`/players/${playerId}`);
        }
    };

    // Redirección si el usuario no está autenticado o no es el dueño.
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (!authUser || !player || player.familyUserId !== authUser.id) {
                router.push('/');
            }
        }
    }, [authUser, player, router]);

    return (
        <main>
            <h2>
                Página de editar jugador: {player?.firstName} {player?.lastName}
            </h2>

            {/* Proveemos los métodos de react-hook-form a los inputs */}
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Campo posición */}
                    <Input
                        label="Posición"
                        name="position"
                        type="text"
                        autoComplete="off"
                        aria-label="Posición"
                        required
                    />

                    {/* Campo habilidades (textarea nativo) */}
                    <div className="input-group">
                        <label htmlFor="skills">Habilidades:</label>
                        <textarea
                            id="skills"
                            {...methods.register('skills')}
                            aria-label="Habilidades"
                        ></textarea>
                    </div>

                    {/* Campo equipo */}
                    <Input
                        label="Equipo"
                        name="team"
                        type="text"
                        autoComplete="off"
                        aria-label="Equipo"
                        required
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
                        Editar jugador
                    </button>
                </form>
            </FormProvider>
        </main>
    );
};

export default EditPlayerPage;

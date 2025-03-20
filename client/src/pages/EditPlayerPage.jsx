// Importamos los hooks.
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

// Importamos el componente Input.
import Input from '../components/Input';

// Importamos las acciones de Redux para obtener y actualizar un jugador.
import { fetchPlayerById, updatePlayer } from '../redux/slices/playerSlice';

// Inicializamos el componente.
const EditPlayerPage = () => {
    // Extraemos playerId de la URL.
    const { playerId } = useParams();

    // Inicializamos el hook de Redux para enviar acciones.
    const dispatch = useDispatch();

    // Inicializamos el hook de navegación.
    const navigate = useNavigate();

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
        if (!player || player.id !== Number(playerId)) {
            dispatch(fetchPlayerById(playerId));
        } else {
            // Si el jugador no tiene strongFoot, asignamos un valor por defecto ('left').
            reset({
                position: player.position || '',
                skills: player.skills || '',
                team: player.team || '',
                strongFoot: player.strongFoot || '',
            });
        }
    }, [dispatch, player, playerId, reset]);

    // Función que maneja el envío del formulario.
    const onSubmit = async (data) => {
        const action = await dispatch(
            updatePlayer({ playerId, formValues: data, authToken }),
        );

        if (updatePlayer.fulfilled.match(action)) {
            navigate(`/players/${playerId}`);
        }
    };

    // Si el usuario no está autenticado, lo redirigimos.
    if (!authUser) return <Navigate to="/" />;

    // Si el jugador no existe o si el usuario autenticado no es su dueño redirigimos.
    if (!player || player.familyUserId !== authUser.id)
        return <Navigate to="/" />;

    return (
        <main>
            <h2>
                Página de editar jugador: {player.firstName} {player.lastName}
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
                    {/* Selección de pierna dominante (inputs nativos para radio) */}
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

// Importamos los hooks.
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';

// Importamos los componentes.
import PlayerListItem from '../components/PlayerListItem';
import Input from '../components/Input';

// Importamos la acción de Redux.
import { fetchPlayers } from '../redux/slices/players';

// Inicializamos el componente.
const HomePage = () => {
    // Inicializamos el hook de Redux para enviar acciones.
    const dispatch = useDispatch();

    // Extraemos los datos de la lista de jugadores desde Redux.
    const { players, loading } = useSelector((state) => state.players);

    // Configuración del formulario con react-hook-form.
    const methods = useForm({
        defaultValues: {
            age: '',
            position: '',
            skills: '',
            team: '',
        },
    });

    // Extraemos el método handleSubmit de react-hook-form.
    const { handleSubmit } = methods;

    // Función que maneja el envío del formulario.
    const onSubmit = (data) => {
        dispatch(fetchPlayers(data));
    };

    // Cargamos la lista de jugadores por defecto al montar el componente sin parámetros de búsqueda.
    useEffect(() => {
        dispatch(fetchPlayers({}));
    }, [dispatch]);

    return (
        <main className="home-page">
            <h2>Página principal</h2>

            {/* Utilizamos FormProvider para proporcionar los métodos de react-hook-form a los inputs */}
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Campo edad */}
                    <Input
                        label="Edad"
                        name="age"
                        type="number"
                        min="4"
                        max="18"
                        autoFocus
                        aria-label="Edad"
                    />

                    {/* Campo posición */}
                    <Input
                        label="Posición"
                        name="position"
                        type="search"
                        autoComplete="off"
                        aria-label="Posición"
                    />

                    {/* Campo habilidades */}
                    <Input
                        label="Habilidades"
                        name="skills"
                        type="search"
                        autoComplete="off"
                        aria-label="Habilidades"
                    />

                    {/* Campo equipo */}
                    <Input
                        label="Equipo"
                        name="team"
                        type="search"
                        autoComplete="off"
                        aria-label="Equipo"
                    />

                    {/* Botón de búsqueda */}
                    <button
                        type="submit"
                        disabled={loading}
                        aria-disabled={loading}
                    >
                        Buscar
                    </button>
                </form>
            </FormProvider>

            {/* Lista de jugadores */}
            <ul>
                {players?.length < 1 ? (
                    <li>No se han encontrado resultados</li>
                ) : (
                    players.map((player) => (
                        <PlayerListItem
                            key={player.id}
                            playerId={player.id}
                            avatar={player.avatar}
                            owner={player.owner}
                            firstName={player.firstName}
                            lastName={player.lastName}
                            birthDate={player.birthDate}
                            position={player.position}
                            team={player.team}
                            strongFoot={player.strongFoot}
                        />
                    ))
                )}
            </ul>
        </main>
    );
};

export default HomePage;

// Importamos los hooks.
import { useState } from 'react';
import usePlayerList from '../hooks/usePlayerList';

// Importamos los componentes.
import PlayerListItem from '../components/PlayerListItem';

// Inicializamos el componente.
const HomePage = () => {
    // Estado local para almacenar los valores del formulario.
    const [formValues, setFormValues] = useState({
        age: '',
        position: '',
        skills: '',
        team: '',
    });

    // Estado local para almacenar los valores de búsqueda.
    const [searchValues, setSearchValues] = useState({});

    // Extraemos valores del hook `usePlayerList`.
    const { players, loading } = usePlayerList(searchValues);

    // Función genérica para manejar cambios en los inputs del formulario.
    const handleChange = (e) => {
        // Extraemos el nombre y valor del input.
        const { name, value } = e.target;

        // Actualizamos el estado con el nuevo valor del input.
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    // Función que maneja el envío del formulario.
    const handleSearchPlayers = (e) => {
        // Prevenimos la recarga de la página.
        e.preventDefault();

        // Actualizamos los valores de búsqueda.
        setSearchValues({
            ...formValues,
        });
    };

    return (
        <main className="home-page">
            <h2>Página principal</h2>

            {/* Formulario de búsqueda de jugadores. */}
            <form onSubmit={handleSearchPlayers}>
                {/* Campo edad. */}
                <label htmlFor="age">Edad:</label>
                <input
                    type="number"
                    name="age"
                    id="age"
                    min="4"
                    max="18"
                    value={formValues.age}
                    onChange={handleChange}
                    autoFocus
                />

                {/* Campo posición. */}
                <label htmlFor="position">Posición:</label>
                <input
                    type="search"
                    name="position"
                    id="position"
                    value={formValues.position}
                    onChange={handleChange}
                />

                {/* Campo habilidades. */}
                <label htmlFor="skills">Habilidades:</label>
                <input
                    type="search"
                    name="skills"
                    id="skills"
                    value={formValues.skills}
                    onChange={handleChange}
                />

                {/* Campo equipo. */}
                <label htmlFor="team">Equipo:</label>
                <input
                    type="search"
                    name="team"
                    id="team"
                    value={formValues.team}
                    onChange={handleChange}
                />

                {/* Botón de búsqueda. */}
                <button disabled={loading}>Buscar</button>
            </form>

            {/* Lista de jugadores. */}
            <ul>
                {players?.length < 1 ? (
                    <li>No se han encontrado resultados</li>
                ) : (
                    players.map((player) => {
                        return (
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
                        );
                    })
                )}
            </ul>
        </main>
    );
};

export default HomePage;

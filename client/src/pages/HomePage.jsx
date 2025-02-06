import { useState } from 'react';
import usePlayerList from '../hooks/usePlayerList';

import PlayerListItem from '../components/PlayerListItem';

// Inicializamos el componente.
const HomePage = () => {
    const [formValues, setFormValues] = useState({
        age: '',
        position: '',
        skills: '',
        team: '',
    });

    const [searchValues, setSearchValues] = useState({});

    const { players, loading } = usePlayerList(searchValues);

    // Función genérica para manejar cambios en los inputs del formulario.
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    // Función que maneja el envío del formulario.
    const handleSearchPlayers = (e) => {
        e.preventDefault();

        setSearchValues({
            ...formValues,
        });
    };

    return (
        <main className="home-page">
            <h2>Página principal</h2>

            <form onSubmit={handleSearchPlayers}>
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

                <label htmlFor="position">Posición:</label>
                <input
                    type="search"
                    name="position"
                    id="position"
                    value={formValues.position}
                    onChange={handleChange}
                />

                <label htmlFor="skills">Habilidades:</label>
                <input
                    type="search"
                    name="skills"
                    id="skills"
                    value={formValues.skills}
                    onChange={handleChange}
                />

                <label htmlFor="team">Equipo:</label>
                <input
                    type="search"
                    name="team"
                    id="team"
                    value={formValues.team}
                    onChange={handleChange}
                />

                <button disabled={loading}>Buscar</button>
            </form>

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

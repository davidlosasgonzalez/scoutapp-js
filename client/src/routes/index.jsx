// Importamos los componentes.
import { Route, Routes } from 'react-router-dom';

// Importamos las páginas.
import HomePage from '../pages/HomePage';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import PrivateProfilePage from '../pages/PrivateProfilePage';
import CreatePlayerPage from '../pages/CreatePlayerPage';
import PlayerDetailsPage from '../pages/PlayerDetailsPage';
import EditPlayerPage from '../pages/EditPlayerPage';
import HiringRequestPage from '../pages/HiringRequestsPage';
import NotFoundPage from '../pages/NotFoundPage';

// Inicializamos el componente.
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/users/private" element={<PrivateProfilePage />} />
            <Route path="/players/create" element={<CreatePlayerPage />} />
            <Route path="/players/:playerId" element={<PlayerDetailsPage />} />
            <Route
                path="/players/:playerId/edit"
                element={<EditPlayerPage />}
            />
            <Route path="/users/hirings" element={<HiringRequestPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default AppRoutes;

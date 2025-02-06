// Importamos los componentes.
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './routes';

// Inicializamos el componente.
const App = () => {
    return (
        <>
            <Header />

            {/* Componente que muestra los mensajes. */}
            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 5000,
                }}
            />

            {/* Rutas o endpoints. */}
            <AppRoutes />

            <Footer />
        </>
    );
};

export default App;

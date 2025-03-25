// Importamos los estilos globales si se usan.
import '@/styles/globals.css';

// Importamos los hooks de React y Redux.
import { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';

// Importamos el sistema de notificaciones.
import { Toaster } from 'react-hot-toast';

// Importamos los componentes globales.
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Importamos el wrapper de Redux y el thunk de autenticación.
import { wrapper } from '@/redux/config/store';
import { fetchAuthUser } from '@/redux/slices/auth';

// Importamos PersistGate para persistencia de estado.
import { PersistGate } from 'redux-persist/integration/react';

// Importamos PropTypes para validar las props del componente.
import PropTypes from 'prop-types';

// Componente auxiliar que carga los datos del usuario si hay token.
const AppInitializer = () => {
    // Inicializamos el hook de Redux para enviar acciones.
    const dispatch = useDispatch();

    // Extraemos authToken y authUser desde Redux.
    const { authToken, authUser } = useSelector((state) => state.auth);

    // Si hay token pero no usuario, lo recuperamos del backend.
    useEffect(() => {
        if (authToken && !authUser) {
            dispatch(fetchAuthUser());
        }
    }, [authToken, authUser, dispatch]);

    return null;
};

// Componente principal de la aplicación. Se renderiza en cada ruta.
const MyApp = ({ Component, ...rest }) => {
    // Extraemos el store y las props hidratadas con el wrapper.
    const { store, props } = wrapper.useWrappedStore(rest);

    // Si el store tiene el persistor (estamos en cliente), usamos PersistGate.
    const content = store.__persistor ? (
        <PersistGate loading={null} persistor={store.__persistor}>
            <Header />
            <AppInitializer />
            <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
            <Component {...props.pageProps} />
            <Footer />
        </PersistGate>
    ) : (
        <>
            <Header />
            <AppInitializer />
            <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
            <Component {...props.pageProps} />
            <Footer />
        </>
    );

    // Envolvemos la app con el proveedor de Redux.
    return <Provider store={store}>{content}</Provider>;
};

// Validamos las props del componente principal.
MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
};

// Exportamos el componente principal.
export default MyApp;

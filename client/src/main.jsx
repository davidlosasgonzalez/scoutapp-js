// Importamos los módulos principales de React.
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

// Importamos los módulos de React Router.
import { BrowserRouter } from 'react-router-dom';

// Importamos el componente principal de la aplicación.
import App from './App.jsx';

// Importamos los componentes provider.
import { Provider } from 'react-redux';

// Importamos el store y el persistor de Redux.
import { store, persistor } from './redux/store';

// Importamos PersistGate para rehidratar el estado persistido.
import { PersistGate } from 'redux-persist/integration/react';

// Importamos los estilos globales.
import './index.css';

// Renderizamos la aplicación en el elemento con id `root`.
createRoot(document.getElementById('root')).render(
    <StrictMode>
        {/* Envolvemos la aplicación con Redux Provider para manejar el estado global */}
        <Provider store={store}>
            {/* PersistGate retrasa el renderizado hasta que se rehidrate el estado persistido */}
            <PersistGate loading={<div>Cargando...</div>} persistor={persistor}>
                {/* Envolvemos con BrowserRouter para manejar la navegación */}
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </StrictMode>,
);

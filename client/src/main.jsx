// Importamos los módulos principales de React.
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

// Importamos los módulos de React Router.
import { BrowserRouter } from 'react-router-dom';

// Importamos el componente principal de la aplicación.
import App from './App.jsx';

// Importamos el proveedor del contexto de autenticación.
import { AuthProvider } from './contexts/AuthContext.jsx';

// Importamos los estilos globales.
import './index.css';

// Renderizamos la aplicación en el elemento con id `root`.
createRoot(document.getElementById('root')).render(
    <StrictMode>
        {/* Envolvemos la aplicación con `BrowserRouter` para manejar la navegación. */}
        <BrowserRouter>
            {/* Proveedor de autenticación para gestionar el estado global del usuario. */}
            <AuthProvider>
                <App />
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>,
);

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import HomePage from './pages/home';

/* === Styles import block */

import './config/theme.css';
import './config/main.css';
import './styles/theme.css';



/* === Navigation block */

// Redirect root path to home page
if (window.location.pathname === '/' || window.location.pathname === '') {
    window.history.replaceState(null, '', '/home');
}



/* === Application entry point block */

// Render main application
const rootElement = document.getElementById('root');

if (rootElement) {
    createRoot(rootElement).render(
        <HomePage />
    );
}
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Adaptamos configuración clásica al nuevo sistema plano.
const compat = new FlatCompat({
    baseDirectory: __dirname,
});

export default [
    // Ignoramos carpetas generadas automáticamente.
    { ignores: ['.next', 'node_modules', 'dist'] },

    // Configuración base de Next.js con buenas prácticas web.
    ...compat.extends('next/core-web-vitals'),

    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        plugins: {
            react,
            'react-hooks': reactHooks,
            prettier,
        },
        rules: {
            // Reglas recomendadas para JS, React y Hooks.
            ...js.configs.recommended.rules,
            ...react.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,

            // Next.js no requiere importar React explícitamente.
            'react/react-in-jsx-scope': 'off',

            // Permitimos target blank sin noreferrer (puedes cambiarlo).
            'react/jsx-no-target-blank': 'off',

            // Integramos Prettier como verificador de formato.
            'prettier/prettier': 'warn',
        },
    },
];

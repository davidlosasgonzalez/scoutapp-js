# 🏗️ Backend - API REST

Este directorio contiene el código del servidor, una API REST construida con Node.js, Express y MySQL.

## 🔧 Configuración y Uso

1. **Instalar dependencias:**
    ```sh
    npm install
    ```
2. **Configurar variables de entorno:**
    ```sh
    cp .env.example .env
    ```
3. **Generar tablas en la base de datos:**
    ```sh
    npm run generate-tables
    ```
4. **(Opcional) Poblar la base de datos con datos de prueba:**
    ```sh
    npm run populate-tables
    ```
5. **Iniciar el servidor en modo desarrollo:**
    ```sh
    npm run dev
    ```

## 🚀 Endpoints

Para más detalles, consulta [`docs/endpoints.md`](./docs/endpoints.md).

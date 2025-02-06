# 🏆 Ojeador Deportivo

**Ojeador Deportivo** es una plataforma diseñada para conectar **jóvenes promesas del fútbol** con **ojeadores deportivos**.

## 📄 Documentación

Este repositorio se divide en dos partes:

-   **Backend (`server/`)**: API REST para gestionar usuarios, jugadores y solicitudes de contratación.
-   **Frontend (`client/`)**: Interfaz web para que los usuarios interactúen con la plataforma.

Cada una tiene su propia documentación específica en:

-   [`server/README.md`](./server/README.md)
-   [`client/README.md`](./client/README.md)

## 🚀 Instalación y ejecución

### 1. Clonar el repositorio

```sh
git clone https://github.com/davidlosasgonzalez/scoutApp
cd ojeador-deportivo
```

### 2. Configurar e iniciar el **servidor**

```sh
cd server
npm install
cp .env.example .env  # Configura las variables de entorno
npm run generate-tables  # Crea las tablas en la base de datos
npm run dev  # Inicia el backend en modo desarrollo
```

### 3. Configurar e iniciar el **cliente**

```sh
cd client
npm install
npm run dev  # Inicia el frontend en modo desarrollo
```

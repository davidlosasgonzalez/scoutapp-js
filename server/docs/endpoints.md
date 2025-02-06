# 📡 API Endpoints

Este documento describe los endpoints disponibles en la API de **Ojeador Deportivo**.

## 📌 Usuarios

| Método   | Endpoint              | Descripción                                      |
| -------- | --------------------- | ------------------------------------------------ |
| **POST** | `/api/users/register` | Crear un nuevo usuario (`family` u `scout`).     |
| **POST** | `/api/users/login`    | Iniciar sesión y obtener token de autenticación. |
| **GET**  | `/api/users/private`  | Obtener perfil privado del usuario autenticado.  |
| **PUT**  | `/api/users`          | Actualizar **nombre de usuario** o **email**.    |
| **GET**  | `/api/users/hirings`  | Obtener solicitudes de contratación asociadas.   |

## 📌 Jugadores (Acciones de familias)

🔒 **Restringido a usuarios de tipo `family`**

| Método   | Endpoint                                   | Descripción                                                         |
| -------- | ------------------------------------------ | ------------------------------------------------------------------- |
| **POST** | `/api/players`                             | Registrar un nuevo jugador.                                         |
| **GET**  | `/api/players`                             | Obtener la lista de jugadores disponibles.                          |
| **POST** | `/api/players/:playerId/videos`            | Agregar un video a un jugador.                                      |
| **GET**  | `/api/players/:playerId`                   | Obtener detalles de un jugador (incluyendo videos).                 |
| **PUT**  | `/api/players/:playerId`                   | Editar **posición**, **skills**, **equipo** y **pierna dominante**. |
| **PUT**  | `/api/players/:playerId/hirings/:hiringId` | Aceptar o rechazar una solicitud de contratación.                   |

## 📌 Jugadores (Acciones de ojeadores)

🔒 **Restringido a usuarios de tipo `scout`**

| Método   | Endpoint                         | Descripción                                           |
| -------- | -------------------------------- | ----------------------------------------------------- |
| **POST** | `/api/players/:playerId/hirings` | Enviar una solicitud de contratación para un jugador. |

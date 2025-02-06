# 🗄️ Base de Datos

Este documento describe la estructura de la base de datos utilizada en **Ojeador Deportivo**.

## 📌 Tablas Principales

### 📂 `users`

| Campo      | Tipo         | Descripción                          |
| ---------- | ------------ | ------------------------------------ |
| id         | INT UNSIGNED | Identificador único del usuario      |
| username   | VARCHAR(30)  | Nombre de usuario                    |
| firstName  | VARCHAR(50)  | Nombre del usuario                   |
| lastName   | VARCHAR(100) | Apellido del usuario                 |
| email      | VARCHAR(100) | Correo electrónico                   |
| password   | VARCHAR(100) | Contraseña encriptada                |
| birthDate  | DATE         | Fecha de nacimiento                  |
| avatar     | VARCHAR(100) | URL del avatar del usuario           |
| role       | ENUM         | Rol del usuario (`family` o `scout`) |
| createdAt  | DATETIME     | Fecha de creación del usuario        |
| modifiedAt | DATETIME     | Última actualización del usuario     |

### 📂 `players`

| Campo        | Tipo         | Descripción                                    |
| ------------ | ------------ | ---------------------------------------------- |
| id           | INT UNSIGNED | Identificador único del jugador                |
| familyUserId | INT UNSIGNED | ID del usuario que registró al jugador         |
| firstName    | VARCHAR(50)  | Nombre del jugador                             |
| lastName     | VARCHAR(100) | Apellido del jugador                           |
| birthDate    | DATE         | Fecha de nacimiento                            |
| position     | VARCHAR(50)  | Posición en el campo                           |
| skills       | VARCHAR(500) | Habilidades destacadas                         |
| team         | VARCHAR(100) | Equipo actual del jugador                      |
| strongFoot   | ENUM         | Pie dominante (`derecha`, `izquierda`, `dual`) |
| createdAt    | DATETIME     | Fecha de creación del jugador                  |
| modifiedAt   | DATETIME     | Última actualización del jugador               |

### 📂 `playerVideos`

| Campo     | Tipo         | Descripción                   |
| --------- | ------------ | ----------------------------- |
| id        | INT UNSIGNED | Identificador único del video |
| playerId  | INT UNSIGNED | ID del jugador asociado       |
| youtubeId | VARCHAR(20)  | ID del vídeo de YouTube       |
| createdAt | DATETIME     | Fecha de subida del video     |

### 📂 `hiringRequests`

| Campo       | Tipo         | Descripción                                   |
| ----------- | ------------ | --------------------------------------------- |
| id          | INT UNSIGNED | Identificador único de la solicitud           |
| scoutUserId | INT UNSIGNED | ID del ojeador que realizó la solicitud       |
| playerId    | INT UNSIGNED | ID del jugador asociado                       |
| status      | ENUM         | Estado (`pendiente`, `aceptada`, `rechazada`) |
| createdAt   | DATETIME     | Fecha de creación de la solicitud             |
| modifiedAt  | DATETIME     | Última actualización de la solicitud          |

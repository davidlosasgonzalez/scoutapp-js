-- Creamos la base de datos.
CREATE DATABASE IF NOT EXISTS scoutApp;

-- Seleccionamos la base de datos.
USE scoutApp;

-- Borramos las tablas si existen.
DROP TABLE IF EXISTS hiringRequests, videos, players, users;

-- Creamos la tabla de usuarios.
CREATE TABLE IF NOT EXISTS users (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(30) UNIQUE NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    birthDate DATE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    avatar VARCHAR(100),
    role ENUM("family", "scout") NOT NULL,
    createdAt DATETIME NOT NULL,
    modifiedAt DATETIME NOT NULL
);

-- Creamos la tabla de jugadores.
CREATE TABLE IF NOT EXISTS players (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    familyUserId INT UNSIGNED NOT NULL,
    FOREIGN KEY(familyUserId) REFERENCES users(id),
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    birthDate DATE NOT NULL,
    position VARCHAR(100) NOT NULL, 
    skills VARCHAR(500), 
    team VARCHAR(100),
    strongFoot ENUM("left", "right", "dual") NOT NULL,
    createdAt DATETIME NOT NULL,
    modifiedAt DATETIME NOT NULL
);

-- Creamos la tabla de videos.
CREATE TABLE IF NOT EXISTS playerVideos (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    playerId INT UNSIGNED NOT NULL,
    FOREIGN KEY(playerId) REFERENCES players(id),
    title VARCHAR(100) NOT NULL,
    url VARCHAR(500) NOT NULL,
    createdAt DATETIME NOT NULL
);

-- Creamos la tabla de contrataciones.
CREATE TABLE IF NOT EXISTS hiringRequests (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    scoutUserId INT UNSIGNED NOT NULL,
    FOREIGN KEY(scoutUserId) REFERENCES users(id),
    playerId INT UNSIGNED NOT NULL,
    FOREIGN KEY(playerId) REFERENCES players(id),
    status ENUM("pendiente", "aceptada", "rechazada") DEFAULT "pendiente",
    createdAt DATETIME NOT NULL,
    modifiedAt DATETIME NOT NULL
);

-- Inserción de datos en la tabla de usuarios.
INSERT INTO users (email, password, birthDate, role) 
VALUES
    ("family1@example.com", "password123", "1980-05-15", "family"),
    ("family2@example.com", "password456", "1975-07-20", "family"), 
    ("scout1@example.com", "password789", "1990-02-10", "scout"),  
    ("scout2@example.com", "password321", "1992-11-25", "scout"),  
    ("family3@example.com", "password654", "1982-03-05", "family"),
    ("family4@example.com", "password1234", "1988-09-17", "family"),
    ("family5@example.com", "password5678", "1981-06-22", "family"),
    ("scout3@example.com", "password8901", "1985-01-30", "scout"),
    ("scout4@example.com", "password2345", "1993-07-14", "scout"),
    ("family6@example.com", "password6789", "1983-11-11", "family"),
    ("scout5@example.com", "password3456", "1980-03-18", "scout"),
    ("family7@example.com", "password4567", "1979-05-23", "family"),
    ("scout6@example.com", "password5678", "1991-12-09", "scout"),
    ("family8@example.com", "password7890", "1990-04-04", "family"),
    ("family9@example.com", "password0123", "1987-02-15", "family"),
    ("scout7@example.com", "password9012", "1989-08-28", "scout"),
    ("scout8@example.com", "password1234", "1992-10-19", "scout"),
    ("family10@example.com", "password3456", "1986-07-07", "family"),
    ("family11@example.com", "password6789", "1984-09-20", "family"),
    ("scout9@example.com", "password4567", "1995-05-01", "scout");

-- Inserción de datos en la tabla de jugadores (creados por usuarios familiares).
INSERT INTO players (userId, firstName, lastName, birthDate, position, skills, team) 
VALUES
    (1, "John", "Doe", "2005-08-20", "Forward", "Speed, Finishing", "Youth Stars"),
    (1, "James", "Smith", "2006-10-15", "Midfielder", "Passing, Vision", "Future Talents"),
    (2, "Lucas", "Johnson", "2004-04-30", "Defender", "Tackling, Strength", "Defense Warriors"),
    (2, "Michael", "Brown", "2007-12-05", "Goalkeeper", "Reflexes, Positioning", "Safe Hands FC"),
    (5, "Alex", "Martinez", "2006-01-12", "Forward", "Dribbling, Finishing", "Rising Stars"),
    (6, "Carlos", "Gomez", "2005-03-12", "Defender", "Positioning, Tackling", "Solid Wall FC"),
    (7, "Daniel", "Hernandez", "2006-05-18", "Midfielder", "Dribbling, Passing", "Creative Playmakers"),
    (8, "Sergio", "Lopez", "2004-09-29", "Forward", "Finishing, Speed", "Fast Attackers"),
    (9, "Adrian", "Garcia", "2003-12-03", "Goalkeeper", "Reflexes, Communication", "Ultimate Defense"),
    (10, "Hector", "Cruz", "2006-08-16", "Midfielder", "Vision, Passing", "Midfield Maestros"),
    (11, "Pablo", "Alvarez", "2007-02-25", "Forward", "Speed, Finishing", "Scoring Machines"),
    (12, "Ivan", "Santos", "2005-11-11", "Defender", "Marking, Tackling", "Backline Heroes"),
    (13, "Diego", "Martinez", "2006-06-06", "Midfielder", "Dribbling, Stamina", "Engine Room"),
    (14, "Ruben", "Perez", "2005-01-09", "Forward", "Finishing, Heading", "Aerial Experts"),
    (15, "Victor", "Ramirez", "2007-07-07", "Goalkeeper", "Positioning, Saving", "Guardian FC"),
    (16, "Miguel", "Gutierrez", "2004-10-20", "Midfielder", "Control, Passing", "Precision Passers"),
    (17, "Oscar", "Lozano", "2003-03-03", "Defender", "Tackling, Strength", "Iron Defense"),
    (18, "Jose", "Torres", "2006-12-12", "Forward", "Speed, Accuracy", "Lightning Strikers"),
    (19, "Manuel", "Jimenez", "2007-09-09", "Midfielder", "Creativity, Passing", "Tactical Innovators"),
    (20, "Javier", "Ortiz", "2004-04-04", "Defender", "Positioning, Stamina", "Dynamic Defenders");

-- Inserción de datos en la tabla de vídeos asociados a jugadores.
INSERT INTO videos (playerId, title, url) 
VALUES
    (1, "John Doe - Top 10 Goals", "https://example.com/videos/john-top10"),
    (1, "John Doe - Speed Skills", "https://example.com/videos/john-speed"),
    (2, "James Smith - Passing Highlights", "https://example.com/videos/james-passing"),
    (3, "Lucas Johnson - Defensive Masterclass", "https://example.com/videos/lucas-defense"),
    (4, "Michael Brown - Amazing Saves", "https://example.com/videos/michael-saves"),
    (5, "Alex Martinez - Incredible Dribbling", "https://example.com/videos/alex-dribbling"),
    (6, "Carlos Gomez - Defensive Highlights", "https://example.com/videos/carlos-defense"),
    (7, "Daniel Hernandez - Dribbling Skills", "https://example.com/videos/daniel-dribble"),
    (8, "Sergio Lopez - Goal Compilation", "https://example.com/videos/sergio-goals"),
    (9, "Adrian Garcia - Top Saves", "https://example.com/videos/adrian-saves"),
    (10, "Hector Cruz - Midfield Vision", "https://example.com/videos/hector-vision"),
    (11, "Pablo Alvarez - Speed Show", "https://example.com/videos/pablo-speed"),
    (12, "Ivan Santos - Tackling Expertise", "https://example.com/videos/ivan-tackle"),
    (13, "Diego Martinez - Stamina Highlights", "https://example.com/videos/diego-stamina"),
    (14, "Ruben Perez - Heading Skills", "https://example.com/videos/ruben-heading"),
    (15, "Victor Ramirez - Amazing Saves", "https://example.com/videos/victor-saves"),
    (16, "Miguel Gutierrez - Passing Precision", "https://example.com/videos/miguel-passing"),
    (17, "Oscar Lozano - Defensive Masterclass", "https://example.com/videos/oscar-defense"),
    (18, "Jose Torres - Speed Drills", "https://example.com/videos/jose-speed"),
    (19, "Manuel Jimenez - Creative Passes", "https://example.com/videos/manuel-passes"),
    (20, "Javier Ortiz - Stamina Focus", "https://example.com/videos/javier-stamina");

-- Inserción de datos en la tabla de solicitudes de contratación (solo enviadas por scouts).
INSERT INTO hiringRequests (userId, playerId, status) 
VALUES
    (3, 1, "pendiente"), 
    (3, 2, "aceptada"),  
    (4, 3, "rechazada"),
    (4, 4, "pendiente"),
    (3, 5, "pendiente"),
    (6, 6, "pendiente"),
    (7, 7, "aceptada"),
    (8, 8, "rechazada"),
    (9, 9, "pendiente"),
    (10, 10, "pendiente"),
    (11, 11, "rechazada"),
    (12, 12, "pendiente"),
    (13, 13, "aceptada"),
    (14, 14, "pendiente"),
    (15, 15, "pendiente"),
    (6, 16, "aceptada"),
    (7, 17, "rechazada"),
    (8, 18, "pendiente"),
    (9, 19, "pendiente"),
    (10, 20, "aceptada");
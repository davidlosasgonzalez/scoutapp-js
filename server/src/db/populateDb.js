import 'dotenv/config';

import getPool from './getPool.js';

import bcrypt from 'bcrypt';

// Función que agrega los datos de prueba a las tablas.
const populateDb = async () => {
    try {
        const pool = await getPool();

        // Encriptamos la contraseña. Será la misma para todos los usuarios.
        const hashedPass = await bcrypt.hash('Hackaboss17!', 10);

        // Fecha de inserción de los datos.
        const now = new Date().toISOString().slice(0, 19).replace('T', ' ');

        // Insertar datos en la tabla users.
        await pool.query(`
            INSERT INTO users (username, firstName, lastName, birthDate, email, password, role, createdAt) 
            VALUES
                ("family1", "John", "Doe", "1980-05-15", "family1@example.com", "${hashedPass}", "family", "${now}"),
                ("family2", "Jane", "Doe", "1975-07-20", "family2@example.com", "${hashedPass}", "family", "${now}"),
                ("scout1", "James", "Smith", "1990-02-10", "scout1@example.com", "${hashedPass}", "scout", "${now}"),
                ("scout2", "Lucas", "Brown", "1992-11-25", "scout2@example.com", "${hashedPass}", "scout", "${now}"),
                ("family3", "Michael", "Johnson", "1982-03-05", "family3@example.com", "${hashedPass}", "family", "${now}"),
                ("family4", "Emily", "Davis", "1988-09-17", "family4@example.com", "${hashedPass}", "family", "${now}"),
                ("family5", "Sarah", "Garcia", "1981-06-22", "family5@example.com", "${hashedPass}", "family", "${now}"),
                ("scout3", "Daniel", "Martinez", "1985-01-30", "scout3@example.com", "${hashedPass}", "scout", "${now}"),
                ("scout4", "Carlos", "Lopez", "1993-07-14", "scout4@example.com", "${hashedPass}", "scout", "${now}"),
                ("family6", "Anna", "Hernandez", "1983-11-11", "family6@example.com", "${hashedPass}", "family", "${now}"),
                ("scout5", "Victor", "Santos", "1980-03-18", "scout5@example.com", "${hashedPass}", "scout", "${now}"),
                ("family7", "Rosa", "Ramirez", "1979-05-23", "family7@example.com", "${hashedPass}", "family", "${now}"),
                ("scout6", "Hector", "Torres", "1991-12-09", "scout6@example.com", "${hashedPass}", "scout", "${now}"),
                ("family8", "Sofia", "Gomez", "1990-04-04", "family8@example.com", "${hashedPass}", "family", "${now}"),
                ("family9", "Isabella", "Cruz", "1987-02-15", "family9@example.com", "${hashedPass}", "family", "${now}"),
                ("scout7", "Diego", "Ortiz", "1989-08-28", "scout7@example.com", "${hashedPass}", "scout", "${now}"),
                ("scout8", "Miguel", "Jimenez", "1992-10-19", "scout8@example.com", "${hashedPass}", "scout", "${now}"),
                ("family10", "Clara", "Alvarez", "1986-07-07", "family10@example.com", "${hashedPass}", "family", "${now}"),
                ("family11", "Natalia", "Gutierrez", "1984-09-20", "family11@example.com", "${hashedPass}", "family", "${now}"),
                ("scout9", "Javier", "Perez", "1995-05-01", "scout9@example.com", "${hashedPass}", "scout", "${now}");
        `);

        // Insertar datos en la tabla players.
        await pool.query(`
            INSERT INTO players (familyUserId, firstName, lastName, birthDate, position, skills, team, strongFoot, createdAt) 
            VALUES
                (1, "John", "Doe", "2015-08-20", "Forward", "Speed, Finishing", "Youth Stars", "derecha", "${now}"),
                (1, "James", "Smith", "2016-10-15", "Midfielder", "Passing, Vision", "Future Talents", "izquierda", "${now}"),
                (2, "Lucas", "Johnson", "2014-04-30", "Defender", "Tackling, Strength", "Defense Warriors", "dual", "${now}"),
                (2, "Michael", "Brown", "2017-12-05", "Goalkeeper", "Reflexes, Positioning", "Safe Hands FC", "derecha", "${now}"),
                (5, "Alex", "Martinez", "2016-01-12", "Forward", "Dribbling, Finishing", "Rising Stars", "izquierda", "${now}"),
                (6, "Carlos", "Gomez", "2015-03-12", "Defender", "Positioning, Tackling", "Solid Wall FC", "dual", "${now}"),
                (7, "Daniel", "Hernandez", "2016-05-18", "Midfielder", "Dribbling, Passing", "Creative Playmakers", "derecha", "${now}"),
                (8, "Sergio", "Lopez", "2014-09-29", "Forward", "Finishing, Speed", "Fast Attackers", "derecha", "${now}"),
                (9, "Adrian", "Garcia", "2013-12-03", "Goalkeeper", "Reflexes, Communication", "Ultimate Defense", "izquierda", "${now}");
        `);

        // Insertar datos en la tabla playerVideos con IDs reales.
        await pool.query(`
            INSERT INTO playerVideos (playerId, youtubeId, createdAt) 
            VALUES
                (1, "c9mK2enm26E", "${now}"),
                (2, "dQXZ8_V7WEE", "${now}"), 
                (3, "JHF87zfI-io", "${now}"), 
                (4, "WfRsP1Xx9T0", "${now}"),
                (5, "cFojC2tlAiw", "${now}"),
                (6, "C1Qyr68M1JY", "${now}"), 
                (7, "U-qlboJn1_M", "${now}")
        `);

        // Insertar datos en la tabla hiringRequests.
        await pool.query(`
            INSERT INTO hiringRequests (scoutUserId, playerId, status, createdAt) 
            VALUES
                (3, 1, "pendiente", "${now}"),
                (3, 2, "aceptada", "${now}"),
                (4, 3, "rechazada", "${now}"),
                (4, 4, "pendiente", "${now}"),
                (3, 5, "pendiente", "${now}"),
                (6, 6, "pendiente", "${now}");
        `);

        console.log('Datos de prueba insertados correctamente');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

// Llamamos a la función anterior.
populateDb();

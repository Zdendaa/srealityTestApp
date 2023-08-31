const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'apartments',
    password: 'ahoj',
    port: 5432, // PostgreSQL default port
});

const connection = () => {
    client.connect((err, client, release) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        console.log('Connected to the database');
    });
}

module.exports = { connection, client };
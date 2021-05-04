const mysql = require('mysql');

// Set database connection credentials
const config = {
    connectionLimit : 10,
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'api',
};

// Create a MySQL pool
const pool = mysql.createPool(config);

// Export the pool
module.exports = pool;
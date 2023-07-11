const mysql = require('mysql');

// connect to mysql database
module.exports = mysql.createConnection({
    host:       "localhost",
    user:       "root",
    password:   "password",
    database:   "budgeting_hub_db",
    timezone:   "+00:00",
    multipleStatements: true
});
// If there is an auth error, then add
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
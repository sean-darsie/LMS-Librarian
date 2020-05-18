import mysql from "mysql";

let connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'WantoCode#15',
    database : 'lms'
});

module.exports = connection;
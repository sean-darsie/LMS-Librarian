// import mysql from "mysql";
var mysql = require("mysql");
'use strict';

let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'texas',
    database : 'library'
});

module.exports = connection;
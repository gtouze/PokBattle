const mysql = require('mysql');
const connection = mysql.createPool({
    host     : 'localhost',
    port     : '3306',
    user     : 'root',
    password : 'admin',
    database : 'pokbattle'
});
module.exports=connection;

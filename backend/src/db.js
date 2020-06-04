const mysql = require('mysql');
const connection = mysql.createPool({
    host     : 'localhost',
    port     : '3308',
    user     : 'root',
    password : '',
    database : 'pokbattle'
});
module.exports=connection;

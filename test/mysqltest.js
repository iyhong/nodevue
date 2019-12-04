const mysql = require('mysql');

const connection = mysql.createConnection({
    host    : 'localhost',
    user    : 'inyong',
    password: 'pass',
    database: 'node'
});

// console.log(connection);
connection.connect();

connection.query('select * from user',function(error, results, fields){

    if(error) throw error;
    console.log('The Firest User is : ', results[0]);

});


connection.end();
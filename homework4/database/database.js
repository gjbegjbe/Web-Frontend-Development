var mysql = require('mysql')

var pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'webhomework'
});

function query(sql, values, callback) {
    console.log("database pool");
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        console.log("get connection ");
        connection.query(sql, values, function (err, results) {
            callback(err, results);
            connection.release();
            if (err) throw err;
        });
    });
}

module.exports = query;
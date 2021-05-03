var db = require('mariadb');

var pool = db.createPool({
    host:'',
    user: 'root',
    password: 'root',
    database: 'dog_kg',
    port: 3306
});

module.exports.pool = pool;

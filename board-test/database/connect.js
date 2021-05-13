var db = require('mariadb');

var pool = db.createPool({
    host:'3.34.136.238',
    user: 'root',
    password: 'root',
    database: 'dog_kg',
    port: 3306
});

module.exports.pool = pool;

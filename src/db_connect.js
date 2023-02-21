const mysql = require('mysql');

// 建立連線的物件
const db = mysql.createConnection({
    host: 'localhost', // domain name || ip
    user: 'test',
    password: 'test',
    database: 'test'
});

db.on('error', ex => {
    console.log(ex);
});

db.connect();

module.exports = db;
const mysql = require('mysql');
const bluebird = require('bluebird');

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

bluebird.promisifyAll(db); // 把db這個物件裡所有非同步 包裝成多一個對應方法的功能

module.exports = db;
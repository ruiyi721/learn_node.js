const express = require("express");
// 建立webserver物件
const app = express();

app.get('/', (req, res) => {
    res.send(`<h2>123</h2>`) // 不要和end同時使用
});

app.get('/abc', (req, res) => {
    res.send(`<h2>456</h2>`)
});

// 要定義404頁面 一定要放在所有路由最後面
app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.write(req.url + "\n");
    res.end('404 找不到網頁');
});
app.listen(3000, () => { console.log('啟動server'); });
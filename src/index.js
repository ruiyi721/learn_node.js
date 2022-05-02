const express = require("express");
// 建立webserver物件
const app = express();
// 在express下 順序很重要!!!

app.set('view engine', 'ejs'); // 設定樣板引擎

app.get('/', (req, res) => {
    // res.send(`<h2>123</h2>`) // 不要和end同時使用
    // 不能同時下send又render
    res.render('home', { name: 'Dora' });
});

app.get('/abc', (req, res) => {
    res.send(`<h2>456</h2>`)
});

// app.get('/a.html', (req, res) => {
//     res.send(`<h2>route / a.html</h2>`)
// });
// 靜態資料夾要放在動態路由後面，404前面
app.use(express.static('public'));

// 要定義404頁面 一定要放在所有路由最後面
app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.write(req.url + "\n");
    res.end('404 找不到網頁');
});
app.listen(3000, () => { console.log('啟動server'); });
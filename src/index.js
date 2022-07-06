// 原生node無支援import和export語法
const express = require("express");
const url = require("url");
const multer = require('multer');
const fs = require('fs');
const upload = multer({ dest: 'tmp_uploads' }); // 標的資料夾為何
const uuid = require('uuid'); // import可用as去改名

// const bodyParser = require('body-parser');
// const urlencodedParser = express.urlencoded({ extended: false });
// 建立webserver物件
const app = express(); // 用express的funciton去建立實體 (為什麼不是用new 因為當初設計時就是用func不是class)
// 在express下 順序很重要!!!
// require放前面 set route 404

app.set('view engine', 'ejs'); // 設定樣板引擎
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
app.use(express.json());

app.get('/', (req, res) => {
    // res.send(`<h2>123</h2>`) // 不要和end同時使用
    // 不能同時下send又render
    res.render('home', { name: 'Dora' });
});

app.get('/abc', (req, res) => {
    res.send(`<h2>456</h2>`);
});

app.get('/sales-json', (req, res) => {
    const sales = require(__dirname + '/../data/sales'); // 要用到這個json檔時 把它require進來
    // res.send(`<h2>${ sales[1].name }</h2>`);
    res.render('sales-table', { test: sales });
});

app.get('/try-qs', (req, res) => {
    const output = {
        url: req.url
    };
    output.urlParts = url.parse(req.url, true);
    // output.urlParts = url.parse("http://localhost:3000/try-qs?a=12&b=bill", true);
    res.json(output);
});
app.get('/try-post', (req, res) => {
    res.render('try-post-form');
});
// 把urlencodedParser當Middleware,為專屬這個route的，先經過他的處理才進去
app.post('/try-post', (req, res) => {
    res.json(req.body); // 如果route裡不回應 狀態就會一直pending
});

app.post('/try-upload', upload.single('avatar'), (req, res) => {
    console.log(req.file);
    if (req.file && req.file.originalname) {
        let ext = ''; // 副檔名
        switch (req.file.mimetype) {
            case 'image/jpeg':
                ext = '.jpg';
                break;
            case 'image/png':
                ext = '.png';
                break;
            case 'image/gif':
                ext = '.gif';
                break;
        }
        if (ext) {
            filename = uuid.v4() + ext;
            fs.rename(
                req.file.path,
                './public/img/' + filename,
                error => {}
            );
        } else {
            fs.unlink(req.file.path, error => {});
        }
    }

    res.json({
        body: req.body,
        file: req.file,
    });
});

// app.get('/a.html', (req, res) => {
//     res.send(`<h2>route / a.html</h2>`)
// });
// 靜態資料夾要放在動態路由後面，404前面
// 只要在use裡面都叫Middleware (中介軟體)
app.use(express.static('public'));

// 要定義404頁面 一定要放在所有路由最後面
app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.write(req.url + "\n");
    res.end('404 找不到網頁');
});
app.listen(3000, () => { console.log('啟動server'); });
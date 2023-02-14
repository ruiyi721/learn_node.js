// 原生node無支援import和export語法
const express = require("express");
express.iamdora = 'Dora';
const url = require("url");
const multer = require('multer');
const fs = require('fs');
const upload = multer({ dest: 'tmp_uploads' }); // 標的資料夾為何
const uuid = require('uuid'); // import可用as去改名
const session = require('express-session');

// const bodyParser = require('body-parser');
// const urlencodedParser = express.urlencoded({ extended: false });
// 建立webserver物件
const app = express(); // 用express的funciton去建立實體 (為什麼不是用new 因為當初設計時就是用func不是class)
// 在express下 順序很重要!!!
// require放前面 set route 404

app.set('view engine', 'ejs'); // 設定樣板引擎
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
app.use(express.json());
// session 的機制是建立在 cookie 之上
app.use(session({
    // 新用戶沒有使用到 session 物件時不會建立 session 和發送 cookie
    saveUninitialized: false,
    resave: false, // 沒變更內容是否強制回存
    secret: '加密用字串',
    cookie: {
        maxAge: 1200000, // 20分鐘，單位毫秒,session的存活時間
    }
}));

app.use((req, res, next) => {
    // 把 session 的資料放到 locals 裡，用來傳給樣板 ejs
    if(req.session.loginUser) {
        res.locals.loginUser = req.session.loginUser;
    } else {
        res.locals.loginUser = {};
    }
    next();
});

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
    const output = {
        body: req.body,
        file: req.file
    }
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
            let filename = uuid.v4() + ext;
            output.newName = filename;
            fs.rename(
                req.file.path,
                './public/img/' + filename,
                error => {}
            );
        } else {
            fs.unlink(req.file.path, error => {});
        }
    }
    console.log(output);

    res.json(output);
});

app.get('/try-params1/:action?/:id?', (req, res) => {
    res.json(req.params);
});

app.get(/^\/mobile\/09\d{2}-?\d{3}-?\d{3}$/, (req, res) => {
    let m = req.url.slice(8);
    m = m.split('?')[0];
    m = m.split('-').join('');
    res.json({
        url: m
    });
});

require(__dirname + '/admins/admin1')(app);
app.use(require(__dirname + '/admins/admin2')); // 當作Middleware來用
// app.use(require(__dirname + '/admins/admin3'));
app.use('/admin3', require(__dirname + '/admins/admin3')); // 第一個參數如為字串時 可被當成baseUrl

app.get('/try-session', (req, res) => {
    req.session.my_var = req.session.my_var || 0; // js 的比較運算子 && 只要兩個都為true則丟後面的值 6 && 7 // 7
    req.session.my_var++;
    res.json({
        my_var: req.session.my_var,
        session: req.session
    });
});

app.use('/member', require(__dirname + '/routes/member'));
app.get('/sess', (req, res) => {
    res.json(req.session);
});

app.get('try-moment', (req, res) => {
    const fm = "";
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
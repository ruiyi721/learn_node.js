// baseUrl: /address-book
// CRUD:
// Create(insert)
//  get: /add
//  post: /add(...)
// Update
//  get: /edit/:sid
//  post: /edit/:sid(...)
// Delete
//  post: /delete/:sid
// READ
//  get: /:page/:category?

const express = require('express');
const moment = require('moment-timezone');
const db = require(__dirname + '/../db_connect');
const router = express.Router();

router.use((req, res, next) => {
    res.locals.title = 'Address-book';
    next();
});

router.get('/add', (req, res) => {
    res.render('address-book/add');
});
router.get('/:page?', (req, res) => {
    const perPage = 3;
    let page = parseInt(req.params.page) || 1;
    const output = {
        totalRows: 0, // 總筆數
        perPage: perPage, // 每一頁最多幾筆
        totalPage: 0, // 總頁數
        page: page, // 用戶要查看的頁數
        rows: 0, // 當頁的資料
    };

    const t_sql = "SELECT COUNT(1) num FROM address_book";
    db.queryAsync(t_sql)
    .then(results => {
        output.totalRows = results[0].num;
        output.totalPage = Math.ceil(output.totalRows / perPage);
        if(output.page < 1) output.page = 1;
        if(output.page > output.totalPage) output.page = output.totalPage;

        const sql = `SELECT * FROM address_book LIMIT ${(output.page-1)*output.perPage}, ${output.perPage}`;
        return db.queryAsync(sql);
    })
    .then(results => {
        console.log(results);
        const fm = 'YYYY-MM-DD';
        for(let i of results) {
            i.birthday = moment(i.birthday).format(fm);
        }
        output.rows = results;
        // res.json(output);
        res.render('address-book/list', output);
    })
    .catch(error => {

    });

    // const t_sql = "SELECT COUNT(1) num FROM address_book";
    // db.query(t_sql, (error, results) => {
    //     output.totalRows = results[0].num;
    //     output.totalPage = Math.ceil(output.totalRows / perPage);
    //     if(output.page < 1) output.page = 1;
    //     if(output.page > output.totalPage) output.page = output.totalPage;

    //     const sql = `SELECT * FROM address_book LIMIT ${(output.page-1)*output.perPage}, ${output.perPage}`;
        
    //     db.query(sql, (error, results) => {
    //         output.rows = results;
    //         res.json(output);
    //     });
    // });
});

module.exports = router;
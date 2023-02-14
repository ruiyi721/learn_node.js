const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {

    res.render('member/login');
});
// 在寫 api
router.post('/login', (req, res) => {
    const users = {
        'dora': {
            nickname: '朵拉',
            pw: '1234'
        },
        'sam': {
            nickname: '山姆',
            pw: '5678'
        },
    };
    const output = {
        success: false,
        error: '帳號或密碼錯誤',
        body: req.body
    };

    if(req.body.account && users[req.body.account]) {
        // 帳號是對的
        if(req.body.password === users[req.body.account].pw) {
            // 密碼也是對的
            // session放入值
            req.session.loginUser = {
                account: req.body.account,
                nickname: users[req.body.account].nickname
            };
            output.success = true;
            delete output.error;
        }
    }

    res.json(output);
});

router.get('/logout', (req, res) => {
    delete req.session.loginUser; // 清掉 session 變數
    res.redirect('/'); // 轉向到別的頁面
});

module.exports = router;
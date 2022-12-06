const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {

    res.render('member/login');
});

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

module.exports = router;
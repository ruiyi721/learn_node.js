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

    if(req.body.account && users[req.body.account]) {
        // 帳號是對的
        if(req.body.password === users[req.body.account].pw) {
            // 密碼也是對的
        }
    }

    res.json({
        body: req.body
    })
});

module.exports = router;
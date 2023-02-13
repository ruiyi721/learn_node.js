const express = require('express');
const router = express.Router();
console.log('iam : ', express.iamdora);

// 自訂middleware
router.use((req, res, next) => {
    // req.params.shinder = 'hello';
    res.locals.memberData = {
        name: 'dora',
        age: 30
    };
    next(); // 呼叫才能進到其他router裡面去做判斷
});

router.get('/:action?/:id?', (req, res) => {
    res.json({
        params: req.params,
        url: req.url,
        baseUrl: req.baseUrl,
        locals: res.locals
    });
});

module.exports = router;
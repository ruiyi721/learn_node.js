const express = require('express');
const router = express.Router();
console.log('iam : ', express.iamdora);

router.get('/:action?/:id?', (req, res) => {
    res.json({
        params: req.params,
        url: req.url,
        baseUrl: req.baseUrl
    });
});

module.exports = router;
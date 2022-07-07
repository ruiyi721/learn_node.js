module.exports = app => {
    app.get('/admin1/:action?/:id?', (req, res) => {
        res.json(req.params);
    });
};
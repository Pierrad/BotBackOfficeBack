var express = require('express');
var router = express.Router();

router.get('/register', function (req, res) {
    res.status(200).json({ data: 'REGISTER' });
});

router.get('/login', function (req, res) {
    res.status(200).json({ data: 'LOGIN' });
});

module.exports = router;
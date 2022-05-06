var express = require('express');
var router = express.Router();

router.get('/upload', function (req, res) {
    res.status(200).json({ data: 'UPLOAD' });
});

router.get('/download', function (req, res) {
    res.status(200).json({ data: 'DOWNLOAD' });
});

router.get('/list', function (req, res) {
    res.status(200).json({ data: 'LIST' });
});

module.exports = router;
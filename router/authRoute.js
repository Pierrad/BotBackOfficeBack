const UserCtrl = require('../controllers/user');
var express = require('express');
var router = express.Router();

router.post("/register", function(req, res) {
    UserCtrl.register(req, res);
});

router.post("/login", function(req, res) {
    UserCtrl.login(req, res);
});

module.exports = router;
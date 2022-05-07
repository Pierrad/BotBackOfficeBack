const UserCtrl = require('../controllers/user');
const express = require('express');
const router = express.Router();

router.post("/register", function(req, res) {
    UserCtrl.register(req, res);
});

router.post("/login", function(req, res) {
    UserCtrl.login(req, res);
});

router.get("/check", function(req, res) {
    UserCtrl.check(req, res);
});

module.exports = router;
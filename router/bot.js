const BotCtrl = require("../controllers/bot")
var express = require("express")
var router = express.Router()

router.get("/", function (req, res) {
  BotCtrl.get(req, res)
})

router.post("/", function (req, res) {
  BotCtrl.add(req, res)
})

router.post("/add/entry", function (req, res) {
  BotCtrl.addEntry(req, res)
})

router.post("/edit/entries", function (req, res) {
  BotCtrl.editEntries(req, res)
})


module.exports = router

const { port, env } = require("./conf/vars")

const moment = require("moment")

const app = require("./conf/express")
const mongo = require("./conf/mongo")

const routerUtils = require("./utils/router")

const authRouter = require("./router/auth")
const botRouter = require("./router/bot")

mongo.connect()

const BLACKLIST = []

app.all("*", function (req, res, next) {
  const ipAddress =
    req.ipInfo.ip.substr(0, 7) == "::ffff:"
      ? req.ipInfo.ip.substr(7)
      : req.ipInfo.ip
  if (BLACKLIST.indexOf(ipAddress) === -1) {
    if (!routerUtils.isAuthorizedRoute(req)) {
      res.status(404).json({
        success: false,
        data: { message: "Route does not exist" },
      })
    } else {
      console.log(
        `🔵 ${ipAddress} called route ${req.originalUrl} (🕦 ${moment().format(
          "l"
        )} ${moment().format("LTS")})`
      )
      next()
    }
  } else {
    res.status(403).json({
      success: false,
      data: { message: ipAddress + " IP is not in whiteList" },
    })
  }
})

app.use("/users", authRouter)
app.use("/bot", botRouter)

app.listen(port, () => {
  console.log(`🤖 Application running in: ${env}`)
  console.log(`❌ Blacklisted ip(s): ${BLACKLIST}`)
  console.log(
    `✅ Example app listening at http://localhost:${process.env.PORT_DEV}`
  )
})

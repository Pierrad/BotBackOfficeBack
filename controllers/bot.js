const Bot = require("../models/Bot")
const checkAuthorization = require("../utils/auth").checkAuthorization


exports.get = async (req, res) => {
  try {
    if (!await checkAuthorization(req)) {
      return res.status(401).json({
        "success": false,
        "data": {
          "message": "Unauthorized"
        }
      })
    }

    const bots = await Bot.find({})

    return res.status(200).json({
      success: true,
      data: {
        message: "Bots retrieved successfully",
        bots: bots,
      },
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      data: {
        message: "Internal error",
      },
    })
  }
}

exports.getById = async (req, res) => {
  try {
    if (!await checkAuthorization(req)) {
      return res.status(401).json({
        "success": false,
        "data": {
          "message": "Unauthorized"
        }
      })
    }

    const bot = await Bot.findById(req.params.id)

    if (!bot) {
      return res.status(404).json({
        "success": false,
        "data": {
          "message": "Bot not found"
        }
      })
    }

    return res.status(200).json({
      success: true,
      data: {
        message: "Bot retrieved successfully",
        bot: bot,
      },
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      data: {
        message: "Internal error",
      },
    })
  }
}

exports.add = async (req, res) => {
  try {
    if (!await checkAuthorization(req)) {
      return res.status(401).json({
        "success": false,
        "data": {
          "message": "Unauthorized"
        }
      })
    }

    if (!req.body.name) {
      return res.status(400).json({
        success: false,
        data: {
          message: "Missing bot name",
        },
      })
    }

    if (!req.body.entries) {
      return res.status(400).json({
        success: false,
        data: {
          message: "Missing bot entries",
        },
      })
    }

    const bot = new Bot({
      name: req.body.name,
      entries: req.body.entries,
    })

    await bot.save()

    return res.status(200).json({
      success: true,
      data: {
        message: "Bot added successfully",
        bot: bot,
      },
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      data: {
        message: "Internal error",
      },
    })
  }
}

exports.addEntry = async (req, res) => {
  try {
    if (!await checkAuthorization(req)) {
      return res.status(401).json({
        "success": false,
        "data": {
          "message": "Unauthorized"
        }
      })
    }

    if (!req.body.botID) {
      return res.status(400).json({
        success: false,
        data: {
          message: "Missing bot id",
        },
      })
    }

    if (!req.body.entry) {
      return res.status(400).json({
        success: false,
        data: {
          message: "No entry to add",
        },
      })
    }

    const bot = await Bot.findById(req.body.botID)

    if (!bot) {
      return res.status(400).json({
        success: false,
        data: {
          message: "Bot not found",
        },
      })
    }

    bot.entries = [...bot.entries, ...req.body.entry]

    await bot.save()

    return res.status(200).json({
      success: true,
      data: {
        message: "Entry added successfully",
        bot: bot,
      },
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      data: {
        message: "Internal error",
      },
    })
  }
}

exports.editEntries = async (req, res) => {
  try {
    if (!await checkAuthorization(req)) {
      return res.status(401).json({
        "success": false,
        "data": {
          "message": "Unauthorized"
        }
      })
    }

    if (!req.body.botID) {
      return res.status(400).json({
        success: false,
        data: {
          message: "Missing bot id",
        },
      })
    }

    if (!req.body.entries) {
      return res.status(400).json({
        success: false,
        data: {
          message: "No entries submitted",
        },
      })
    }

    const bot = await Bot.findById(req.body.botID)

    if (!bot) {
      return res.status(400).json({
        success: false,
        data: {
          message: "Bot not found",
        },
      })
    }

    bot.entries = req.body.entries

    await bot.save()

    return res.status(200).json({
      success: true,
      data: {
        message: "Entries edited successfully",
        bot: bot,
      },  
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      data: {
        message: "Internal error",
      },
    })
  }
}

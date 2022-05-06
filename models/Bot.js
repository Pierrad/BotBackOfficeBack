const mongoose = require("mongoose")

const { Schema } = mongoose

const botSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  entries: [
    {
      emoji: String,
      words: [String]
    }
  ]
})

module.exports = mongoose.model("Bot", botSchema)

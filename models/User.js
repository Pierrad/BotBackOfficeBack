const mongoose = require("mongoose")

const { Schema } = mongoose

const userSchema = new Schema({
  publicId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true, //replace " hello" or "hello " by "hello"
    lowercase: true,
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 128,
    required: true,
  },
  token: {
    expiration: {
        type: Number,
        default: Date.now()
    },
    token: {
        type: String
    }
},
})

module.exports = mongoose.model("User", userSchema)

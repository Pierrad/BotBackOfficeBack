const User = require("../models/User")
const pwdValidator = require("password-validator")

const schema = new pwdValidator()

schema
  .is()
  .min(8)
  .is()
  .max(100)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .not()
  .spaces()
  .has()
  .symbols()
  .is()
  .not()
  .oneOf(["P@ssw0rd", "P@ssword123", "@Zerty12345"])

exports.isValidPassword = (password) => {
  return schema.validate(password)
}

exports.checkAuthorization = async (req) => {
  const token = req.headers.authorization
  const user = await User.findOne({ "token.token": token })
  if (user) {
    return true
  }
  return false
}

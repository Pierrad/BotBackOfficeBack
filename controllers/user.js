const AuthUtils = require("../utils/auth");
const Utils = require("../utils/misc");
const User = require("../models/User");
const validator = require("email-validator");
const bcrypt = require("bcrypt");

const SALTROUNDS = 10;
const USER_TOKEN_EXPIRATION = 86_400_000;

exports.getUser = async (data) => {
  return await getUser(data);
};

const getUser = async (data) => {
  return new Promise(async (resolve) => {
      try {
          const user = await User.findOne(data);
          if (!user) {
              return resolve({
                  exist: false,
                  user: null
              });
          }
          return resolve({
              exist: true,
              user: user
          });
      } catch {
          return resolve({
              exist: false,
              user: null
          });
      }
  });
};


exports.register = async (req, res) => {
  try {
      if (!req.body.password || !req.body.email) {
          return res.status(400).json (
              {
                  "success": false,
                  "data": {
                      "message": "Missing arguments"
                  }
              }
          );
      }

      const email = req.body.email.trim();
      if (!validator.validate(email)) {
          return res.status(403).json(
              {
                  "success": false,
                  "data": {
                      "message": "Invalid arguments"
                  }
              }
          );
      }

      const isEmailExists = await getUser({ email });
      if (isEmailExists.exist) {
          return res.status(403).json(
              {
                  "success": false,
                  "data": {
                      "message": "User already exists"
                  }
              }
          );
      }

      const password = req.body.password.trim();
      if (!AuthUtils.isValidPassword(password)) {
          return res.status(403).json(
              {
                  "success": false,
                  "data": {
                      "message": "Invalid password. Must contain uppercase, lowercase, digits, symbols, length between 8 to 100, no spaces"
                  }
              }
          );
      }
      const hashedPassword = await bcrypt.hashSync(password, SALTROUNDS);


      const newUser = new User(
          {
              "email": email.toLowerCase(),
              "password": hashedPassword,
          }
      );
      const user = await newUser.save();
      return res.status(200).json(
          {
              "success": true,
              "data": {
                  "message": "User added successfully",
                  "user": user
              }
          }
      );

  } catch(error) {
      console.log(error);
      return res.status(500).json(
          {
              "success": false,
              "data": {
                  "message": "Internal error"
              }
          }
      );
  }
};

exports.login = async (req, res) => {
  try {
      if (!req.body.email || !req.body.password) {
          return res.status(403).json(
              {
                  "success": false,
                  "data": {
                      "message": "Missing arguments"
                  }
              }
          );
      }

      const email = req.body.email.trim().toLowerCase();
      const userWithGivenEmail = await getUser({email: email});
      const password = req.body.password;
      if (!userWithGivenEmail.exist || !userWithGivenEmail.user) {
          return res.status(403).json(
              {
                  "success": false,
                  "data": {
                      "message": "Invalid email or password"
                  }
              }
          );
      }

      const user = userWithGivenEmail.user;
      if (!bcrypt.compareSync(password, user.password)) {
          return res.status(403).json(
              {
                  "success": false,
                  "data": {
                      "message": "Invalid email or password"
                  }
              }
          );
      }

      user.token.token = Utils.generateId(100);
      user.token.expiration = Date.now() + USER_TOKEN_EXPIRATION;
      await user.save();

      return res.status(200).json(
          {
              "success": true,
              "data": {
                  "message": "Login successfully",
                  "user": user
              }
          }
      );

  } catch (error) {
      console.log(error);
      return res.status(500).json(
          {
              "success": false,
              "data": {
                  "message": "Internal error"
              }
          }
      );
  }
};


exports.check = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const user = await User.findOne({ "token.token": token });

        if (!user) {
            return res.status(404).json(
                {
                    "success": false,
                    "data": {
                        "message": "User not found"
                    }
                }
            );
        }

        user.token.token = Utils.generateId(100);
        user.token.expiration = Date.now() + USER_TOKEN_EXPIRATION;
        await user.save();

        res.status(200).json(
            {
                "success": true,
                "data": {
                    "message": "User exists",
                    "user": user
                }
            }
        );
  
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                "success": false,
                "data": {
                    "message": "Internal error"
                }
            }
        );
    }
  };
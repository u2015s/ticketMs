const bcrypt = require("bcryptjs");
const generateAuthToken = require("../utils/generateAuthToken");
const validator = require('validator');
const {db} = require('../db');
var uniqid = require('uniqid'); 

exports.register =  async (req, res) => {
    try {
      const { email } = req.body;
      // console.log(email)
      const foundUser = await User.findOne({ email });
      if (foundUser) {
        return res.status(400).json({
          message: "User with this email already exists.",
        });
      } else {
          let user = await new User(req.body);
          const salt = await bcrypt.genSalt(10);

          //password check
          if (!user.password.length > 6) {
              throw new Error('Password must be greated than 6');
          }
          user.password = await bcrypt.hash(user.password, salt);

          if(req.body.role === "tax-accountant"){
            let profile = await taxAccountantProfile.create({})
            // console.log(profile)
            user.profileId = profile._id
          }else if (req.body.role === "tax-payer"){
            let profile = await taxPayerProfile.create({})
            // console.log(profile)
            user.profileId = profile._id
          }

          user = await user.save();     
          const token = generateAuthToken(user._id);

          return res.status(201).json({
              message: "User created successfully.",
              response: {
                name: user.name,
                email: user.email,
                _id: user._id,
                token,
              },
          });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong!",
        error: error.message,
      });
    }
  }


exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const foundUser = await User.findOne({ email });

      if (!foundUser) {
        return res.status(403).json({
          message: "Incorrect email or password!",
        });
      } else {
        const isPasswordValid = bcrypt.compare(password, foundUser.password);
        if (!isPasswordValid) {
          return res.status(403).json({
            message: "Incorrect password.",
          });
        }
  
        const token = generateAuthToken(foundUser._id);
  
        return res.status(200).json({
          message: "Logged in successfully.",
          response: {
            token,
            name: foundUser.name,
            email: foundUser.email,
            role:foundUser.role,
            _id: foundUser._id,
          },
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong!",
        error: error.message,
      });
    }
}

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      response: {
        users,
      },
      message: "Users fetched successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
}
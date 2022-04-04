const bcrypt = require("bcryptjs");
const generateAuthToken = require("../utils/generateAuthToken");
const validator = require('validator');
const {db} = require('../db');
var uniqid = require('uniqid'); const { FormateData, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } = require('../utils');

async function FindUser({ email }){
  try{
      const existingUser = await db.query(`SELECT * FROM users WHERE email="${email}"`);
      return existingUser;
  }catch(err){
      throw new AppError("User Not Found",404)
  }
}

exports.login =  async (req, res) => {
    try {
      const { email, password } = req.body;
          let existingUser = await FindUser({ email });

            if (existingUser.length > 0) {
                existingUser = existingUser[0]
                const validPassword = await ValidatePassword(password, existingUser.password);

                if (validPassword) {
                    const token = await GenerateSignature({ email: existingUser.email, _id: existingUser._id });
                    return ({ id: existingUser.id, token });
                }else{
                    return res.status(400).json({
                      message: "Invalid Password",
                      error: error.message,
                    });
                }

            }else{
              return res.status(404).json({
                message: "User Not Found",
                error: error.message,
              });
            }



    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong!",
        error: error.message,
      });
    }
  }


exports.register = async (req, res) => {
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
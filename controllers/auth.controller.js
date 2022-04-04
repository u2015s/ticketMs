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
      throw new Error("User Not Found")
  }
}

async function CreateUser({ email, password, name}){
  try{
      let id = uniqid()
      await db.query(
          `INSERT INTO users (id,name,email,password)
          VALUES ('${id}', '${name}', '${email}', '${password}')`
      );
      return {
          id:id
      };
  }catch(err){
      throw new Error("Unable to Create User")
  }
}
exports.login =  async (req, res) => {
    try {
      const { email, password } = req.body;
      // console.log(email, password)
          let existingUser = await FindUser({ email });

            if (existingUser.length > 0) {
                existingUser = existingUser[0]
                const validPassword = await ValidatePassword(password, existingUser.password);

                if (validPassword) {
                    const token = await GenerateSignature({ email: existingUser.email, _id: existingUser._id });
                    
                    return res.status(200).json({
                      data:{ _id: existingUser.id, token, }
                    });
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
      const { email, password, name } = req.body;

                const foundUser = await FindUser({ email });
                // console.log(foundUser)
                if (foundUser.length > 0) {
                  return res.status(400).json({
                    message: "User with this email already exists.",
                  });
                }else {
            

                  let salt = await GenerateSalt();

                  let userPassword = await GeneratePassword(password, salt);

                  const existingUser = await CreateUser({ email, password: userPassword, name });
                  
                  const token = await GenerateSignature({ email: email, _id: existingUser.id });
                  
                  return res.status(200).json({
                    data:{_id: existingUser.id, token: token}
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
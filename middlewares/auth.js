const jwt = require("jsonwebtoken");
const {db} = require('../db');

const privateKey = process.env.JWT_KEY;

const verifyAuthentication = async (req, res, next) => {
  try {

    const bearerToken = req.headers["authorization"];
    const token = bearerToken.split(" ")[1];
    const decoded = jwt.verify(token, privateKey);

    // const user = await User.findById(decoded._id);
    // console.log(decoded)
    const user = await db.query(`SELECT * FROM users WHERE email='${decoded.email}'`);
    // return existingUser;
    if (!user) {
      return res.status(401).json({
        message: "You're not authorized to access this information.",
      });
    }
    
    req.user = user[0];
    // console.log(req.user.id)
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({
      message: "You're not authorized to acess this information.",
      error: error.message,
    });
  }
};

module.exports = verifyAuthentication;

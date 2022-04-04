const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Utility functions
module.exports.GenerateSalt = async () => {
        return await bcrypt.genSalt(10)
},

        module.exports.GeneratePassword = async (password, salt) => {
                return await bcrypt.hash(password, salt);
        };


module.exports.ValidatePassword = async (enteredPassword, savedPassword) => {
        // return await this.GeneratePassword(enteredPassword, salt) === savedPassword;
        return await bcrypt.compare(enteredPassword, savedPassword);
};

module.exports.GenerateSignature = async (payload) => {
        return await jwt.sign(payload, APP_SECRET, { expiresIn: '1d' })
},

        module.exports.ValidateSignature = async (req) => {

                const signature = req.get('Authorization');

                // console.log(signature);

                if (signature) {
                        const payload = await jwt.verify(signature.split(' ')[1], APP_SECRET);
                        req.user = payload;
                        return true;
                }

                return false
        };

module.exports.FormateData = (data) => {
        if (data) {
                return { data }
        } else {
                throw new Error('Data Not found!')
        }
}


const dotEnv  = require("dotenv");
const path = require('path')

if (process.env.NODE_ENV !== 'prod') {
    const configFile =  path.resolve(__dirname, `../../.env`);
    dotEnv.config({ path:  configFile });
} else {
    dotEnv.config();
}
const config = {
    db: {
      /* don't expose password or any sensitive info, done only for demo */
      host: "db4free.net",
      user: "tmsdbuser",
      password: "helloworld",
      database: "ticketms",
    },
    listPerPage: 10,
  };
//   module.exports = config;
module.exports = {
    PORT: process.env.PORT,
    APP_SECRET: process.env.APP_SECRET,
    config
}
 
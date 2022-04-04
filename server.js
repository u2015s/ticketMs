const express = require('express');
const app = express();
var cors = require('cors');
const path = require('path');
require("dotenv").config({ path: "./config.env" });
const verifyAuthentication = require("./middlewares/auth");

app.use(express.json());
app.use(cors());


app.use(express.static(path.join(__dirname, './client/build')));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build', 'index.html'));
});

app.use('/api/auth', require("./routes/auth.routes.js"))
app.use('/api/train', require("./routes/train.routes.js"))
app.use(verifyAuthentication)
app.use('/api/booking', require("./routes/booking.routes.js"))



module.exports = app

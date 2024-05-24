const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
const path = require("path");
require('dotenv').config();

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// routes
const DashboardRoute = require('./routes/dashboardRoute')
const AuthRoute = require('./routes/authRoute')
const IPFSRoute = require('./routes/ipfsRoutes.js')

app.use('/',DashboardRoute)
app.use('/auth',AuthRoute)
app.use('/ipfs',IPFSRoute)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server Listening on http://localhost:${PORT}/`);
}).on("error", function(err) {
    console.log(err);
});

module.exports = app;
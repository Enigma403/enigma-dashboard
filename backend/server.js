const express = require('express');
const cors = require('cors')
const passport = require('passport');
const session = require("express-session");
const bodyParser = require("body-parser");
const crypto = require('crypto')
const AuthRoutes = require("./routes/AuthRoutes");
const db = require('./config/database');
const {config} = require('./config/config');
const DashRoutes = require("./routes/DashRoutes");



const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

const secretKey = crypto.randomBytes(64).toString('hex');

app.use(session({
    secret: secretKey,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000
    }
}));


// Routes
app.use('/',AuthRoutes);
app.use('/dashboard', DashRoutes);


// Sever
app.listen(config.PORT,() => {
    console.log('serwer słucha na ' + config.PORT)
});
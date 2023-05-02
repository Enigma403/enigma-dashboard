const express = require('express');
const AuthRoutes = require("./routes/AuthRoutes");
const db = require('./config/database');
const {config} = require('./config/config');
const DashRoutes = require("./routes/DashRoutes");
const bodyParser = require("body-parser");
const cors = require('cors')

const session = require("express-session");

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

app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true
}));

// Routes
app.use('/',AuthRoutes);
app.use('/dashboard', DashRoutes);


// Sever
app.listen(config.PORT,() => {
    console.log('serwer słucha na ' + config.PORT)
});
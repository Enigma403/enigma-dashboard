const express = require('express');
const AuthControllers = require('../controllers/AuthController');

const AuthRoutes = express.Router();

AuthRoutes.use('/auth', AuthControllers);

module.exports = AuthRoutes;

const express = require('express');
const AuthControllers = require("../controllers/AuthController");
const DashRoutes = express.Router();

DashRoutes.get('/', (req, res) => {
    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: 'Nie jesteś zalogowany.' });
    }
    const { name } = req.session.user;
    res.json('Zalogowany w panelu jako ' + name);
});


module.exports = DashRoutes;
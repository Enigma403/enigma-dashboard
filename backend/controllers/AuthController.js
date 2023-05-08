const express = require('express');
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const session = require('express-session');

const AuthControllers = express.Router();


AuthControllers

    .post('/sign-in', async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'Nie znaleziono użytkownika.' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(401).json({ message: 'Nieprawidłowe hasło.' });
            }

            req.session.user = {
                id: user._id,
                name: user.name,
                email: user.email
            };

            req.session.save();
            res.redirect('/dashboard')
        } catch (error) {
            res.status(500).json({ message: 'Wystąpił błąd serwera.' });
        }
    })


    .get('/logout', (req, res) => {
        req.session.destroy();
    })

    .post('/sign-up', async (req, res) => {
        const { name, email, password } = req.body;

        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(409).json({ message: 'Użytkownik o podanym adresie email już istnieje.' });
            }

            const user = new User({ name, email, password });
            await user.save();

            req.session.user = {
                id: user._id,
                name: user.name,
                email: user.email
            };

            res.status(201).json({ message: 'Rejestracja przebiegła pomyślnie.' });
        } catch (error) {
            res.status(500).json({ message: 'Wystąpił błąd serwera.' });
        }
    })


module.exports = AuthControllers;

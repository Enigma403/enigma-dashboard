const mongoose = require('mongoose');
const {config} = require("./config");

// connect database
mongoose.connect(config.DATA, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: false
})
    .then(() => console.log('Połączono z bazą danych MongoDB'))
    .catch((err) => console.error('Błąd połączenia z bazą danych MongoDB', err));


module.exports = mongoose.connect;
const mongoose = require('mongoose');

const URI = 'mongodb://localhost/mern-tasks1';
mongoose.connect(URI)
    .then(dp => console.log('DB is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;
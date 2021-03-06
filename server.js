const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { mongoose } = require('./database');
const bodyParser = require('body-parser');

const app = express();
// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/tasks', require('./routes/task.routes'));
app.use('/api/user', require('./routes/user.routes'));

// Static files
app.use(express.static(path.join(__dirname, 'public')))

// Starting the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});

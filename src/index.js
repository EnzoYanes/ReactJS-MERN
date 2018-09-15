const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const path = require('path');
const { mongoose } = require('./database');
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(session({
    secret: 'Esto es un secreto',
    resave: true,
    saveUninitialized: true
}));

// Routes
app.use('/api/tasks', require('./routes/task.routes'));

// Static files
app.use(express.static(path.join(__dirname, 'public')))

// Starting the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});

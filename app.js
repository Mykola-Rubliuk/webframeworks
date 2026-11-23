require('dotenv').config();
require('./app_api/models/db');

var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./app_server/routes/index');
const apiRouter = require('./app_api/routes/index');
const cors = require('cors');

const app = express();
const User = mongoose.model('User');

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(session({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_public')));

app.use('/api', cors({
    origin: [
        'http://localhost:4200',
        'http://localhost:3000',
        'https://localhost:443',
        'http://localhost:8000'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept'
    ]
}));

app.use('/api', apiRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
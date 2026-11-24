require('../../app_api/models/users');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');


const apiOptions = {
    server: process.env.API_URL || 'https://localhost:443'
};


if (process.env.NODE_ENV === 'production') {
    apiOptions.server = 'https://webframeworks-ox1x.onrender.com';
}

/* GET 'Login' page */
const loginPage = function (req, res) {
    res.render('login', {
        title: 'Login - CineDex',
        hideHeader: true,
        pageHeader: {title: 'CineDex', strapline: 'Log in to manage your collection'}
    });
};

/* GET 'Register' page */
const registerPage = function (req, res) {
    res.render('register', {
        title: 'Register - CineDex',
        hideHeader: true,
        pageHeader: {title: 'CineDex', strapline: 'Create your personal cinematic library'}
    });
};

/* POST 'Login' action */
const doLogin = function (req, res, next) {
    passport.authenticate('local', (err, user, info) => {

        console.log('Error:', err);
        console.log('User:', user);
        console.log('Info:', info);

        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(401).render('login', {
                title: 'Login - CineDex',
                hideHeader: true,
                pageHeader: {
                    title: 'CineDex',
                    strapline: 'Log in to manage your collection'
                },
                error: info?.message || 'Invalid email or password'
            });
        }

        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }

            return res.redirect('/movies');
        });
    })(req, res, next);
};

/* POST 'Register' action */
const doRegister = async function (req, res) {
    try {
        const {name, email, password} = req.body;

        if (req.body.password.length < 8) {
            return res.status(400).render('register', {
                title: 'Register - CineDex',
                hideHeader: true,
                pageHeader: {
                    title: 'CineDex',
                    strapline: 'Create an account to manage your collection'
                },
                error: 'Password must be at least 8 characters long'
            });
        }

        const user = new User({
            name: name,
            email: email
        });

        await User.register(user, password);

        res.redirect('/login');

    } catch (err) {
        let errorMsg = 'Registration failed';

        if (err.name === 'UserExistsError') {
            errorMsg = 'A user with this email is already registered';
        }


        res.status(400).render('register', {
            title: 'Register - CineDex',
            hideHeader: true,
            pageHeader: {
                title: 'CineDex',
                strapline: 'Create your personal cinematic library'
            },
            error: errorMsg
        });
    }
};

module.exports = {
    loginPage,
    registerPage,
    doLogin,
    doRegister
};
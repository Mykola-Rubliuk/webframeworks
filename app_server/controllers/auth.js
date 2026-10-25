const axios = require('axios');

const apiOptions = {
  server: 'http://localhost:3000'
};

if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://webframeworks-ox1x.onrender.com';
}

/* GET 'Login' page */
const loginPage = function(req, res) {
  res.render('login', {
    title: 'Login - CineDex',
    hideHeader: true,
    pageHeader: { title: 'CineDex', strapline: 'Log in to manage your collection' }
  });
};

/* GET 'Register' page */
const registerPage = function(req, res) {
  res.render('register', {
    title: 'Register - CineDex',
    hideHeader: true,
    pageHeader: { title: 'CineDex', strapline: 'Create your personal cinematic library' }
  });
};

/* POST 'Login' action */
const doLogin = async function(req, res) {
  try {
    await axios.post(`${apiOptions.server}/api/login`, req.body);
    res.redirect('/movies');
  } catch (err) {
    const errorMsg = err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : 'Invalid email or password';

    res.status(401).render('login', {
      title: 'Login - CineDex',
      hideHeader: true,
      pageHeader: { title: 'CineDex', strapline: 'Log in to manage your collection' },
      error: errorMsg
    });
  }
};

/* POST 'Register' action */
const doRegister = async function(req, res) {
  try {
    await axios.post(`${apiOptions.server}/api/register`, req.body);
    res.redirect('/movie');
  } catch (err) {
    const errorMsg = err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : 'Registration failed';

    res.status(400).render('register', {
      title: 'Register - CineDex',
      hideHeader: true,
      pageHeader: { title: 'CineDex', strapline: 'Create your personal cinematic library' },
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
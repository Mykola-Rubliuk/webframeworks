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
const doLogin = function(req, res) {
  res.redirect('/movies');
};

/* POST 'Register' action */
const doRegister = function(req, res) {
  res.redirect('/movies');
};

module.exports = {
  loginPage,
  registerPage,
  doLogin,
  doRegister
};

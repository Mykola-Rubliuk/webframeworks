const express = require('express');
const router = express.Router();

const ctrlAuth = require('../controllers/auth');
const ctrlMovies = require('../controllers/movies');

router.get('/login', ctrlAuth.loginPage);
router.get('/register', ctrlAuth.registerPage);

router.post('/login', ctrlAuth.doLogin);
router.post('/register', ctrlAuth.doRegister);

router.get('/', ctrlMovies.movieList);
router.get('/movies', ctrlMovies.movieList);
router.post('/movies/add', ctrlMovies.addMovie);

module.exports = router;
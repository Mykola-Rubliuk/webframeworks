const express = require('express');
const router = express.Router();

const ctrlMovies = require('../controllers/movies');
const ctrlAuth = require('../controllers/auth');

// Auth routes
router.post('/login', ctrlAuth.login);
router.post('/register', ctrlAuth.register);

// Movies routes
router
    .route('/movies')
    .get(ctrlMovies.moviesList)
    .post(ctrlMovies.moviesCreate);

router
    .route('/movies/:movieid')
    .get(ctrlMovies.moviesReadOne);

module.exports = router;
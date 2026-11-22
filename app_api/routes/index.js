const express = require('express');
const router = express.Router();

const ctrlMovies = require('../controllers/movies');

// Movies routes
router
    .route('/movies')
    .get(ctrlMovies.moviesList)
    .post(ctrlMovies.moviesCreate);

router
    .route('/movies/:movieid')
    .get(ctrlMovies.moviesReadOne);

module.exports = router;
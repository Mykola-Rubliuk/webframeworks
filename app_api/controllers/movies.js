const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');

// GET /api/movies - получить список всех фильмов
const moviesList = async function(req, res) {
    try {
        const movies = await Movie.find().sort({ releaseYear: -1 });
        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json({ message: "Error fetching movies", error: err });
    }
};

// GET /api/movies/:movieid - получить один фильм по ID
const moviesReadOne = async function(req, res) {
    if (req.params && req.params.movieid) {
        try {
            const movie = await Movie.findById(req.params.movieid);
            if (!movie) {
                return res.status(404).json({ message: "movieid not found" });
            }
            res.status(200).json(movie);
        } catch (err) {
            res.status(500).json({ message: "Error retrieving movie", error: err });
        }
    } else {
        res.status(400).json({ message: "No movieid in request" });
    }
};

// POST /api/movies - создать новый фильм
const moviesCreate = async function(req, res) {
    try {
        const genreArray = req.body.genre
            ? (Array.isArray(req.body.genre) ? req.body.genre : req.body.genre.split(',').map(g => g.trim()))
            : [];

        const movie = await Movie.create({
            title: req.body.title,
            director: req.body.director,
            releaseYear: req.body.releaseYear,
            durationMinutes: req.body.durationMinutes ? parseInt(req.body.durationMinutes) : undefined,
            description: req.body.description,
            genre: genreArray,
            averageRating: req.body.rating || 5.0,
            logoUrl: req.body.logoUrl,
            createdByUser: req.body.createdByUser || 'CinemaGod',
            userId: req.body.userId || '65f987654321fedcba543210'
        });

        res.status(201).json(movie);
    } catch (err) {
        res.status(400).json({ message: "Error creating movie", error: err });
    }
};

module.exports = {
    moviesList,
    moviesReadOne,
    moviesCreate
};
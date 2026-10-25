const axios = require('axios');

const apiOptions = {
    server: 'http://localhost:3000'
};

if (process.env.NODE_ENV === 'production') {
    apiOptions.server = 'https://webframeworks-ox1x.onrender.com';
}

/* GET 'Movies' list page */
const movieList = async function(req, res) {
    try {
        const response = await axios.get(`${apiOptions.server}/api/movies`);
        res.render('all-movies', {
            title: 'CineDex - Trending Catalog',
            movies: response.data
        });
    } catch (err) {
        console.error("API GET Error:", err.message);
        res.render('all-movies', {
            title: 'CineDex - Trending Catalog',
            movies: []
        });
    }
};

/* POST 'Add Movie' action */
const doAddMovie = async function(req, res) {
    try {
        await axios.post(`${apiOptions.server}/api/movies`, req.body);
        res.redirect('/movies');
    } catch (err) {
        console.error("API POST Error:", err.message);
        res.status(500).render('error', {
            message: 'Failed to post movie via API',
            error: err.response ? err.response.data : err.message
        });
    }
};

module.exports = {
    movieList,
    doAddMovie
};
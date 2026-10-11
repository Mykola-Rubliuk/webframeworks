/* GET 'Movies' list page */
const movieList = function(req, res) {
  res.render('all-movies', {
    title: 'CineDex - Trending Catalog',
    movies: [
      {
        title: 'Neon Horizon 2049',
        director: 'Marcus Vance',
        releaseYear: 2024,
        genre: ['Sci-Fi', 'Thriller'],
        averageRating: 4.8,
        logoUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500'
      },
      {
        title: 'Inception',
        director: 'Christopher Nolan',
        releaseYear: 2010,
        genre: ['Sci-Fi', 'Action'],
        averageRating: 4.9,
        logoUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500'
      }
    ]
  });
};

const doAddMovie = function(req, res) {
  res.redirect('/movies');
};

module.exports = {
  movieList,
  doAddMovie
};

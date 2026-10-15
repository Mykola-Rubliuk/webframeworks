const mongoose = require('mongoose');


const movieSchema = new mongoose.Schema({
    title: {type: String, required: true},
    genre: [String], // ['Sci-Fi', 'Action']
    director: String,
    releaseYear: {type: Number, 'default': 2026},
    durationMinutes: {type: Number, 'default': 0.00, placeholder: "120 min"},
    description: {type: String},
    averageRating: {type: Number, 'default': 5.0, min: 1, max: 5},
    logoUrl: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdByUser: {type: String, 'default': 'User'},
});

mongoose.model('Movie', movieSchema);

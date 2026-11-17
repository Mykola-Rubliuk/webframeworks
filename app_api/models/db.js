const mongoose = require('mongoose');

const dbURI = process.env.MONGODB_URI;

if (!dbURI) {
    console.error("MONGODB_URI is not set. Add it to .env (locally) or to the environment variables (on Render).");
} else {
    mongoose.connect(dbURI).then(
        () => { console.log("Mongoose is connected to CineDex"); },
        err => { console.log("Mongoose connection error:", err); }
    );
}

require('./movies');
require('./users');
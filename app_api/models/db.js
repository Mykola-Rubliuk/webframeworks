const mongoose = require('mongoose');

const dbURI = "mongodb+srv://morrygithub_db_user:NMGCfZ4gNsHVdcv1@wf.332aaqh.mongodb.net/CineDex?retryWrites=true&w=majority";

try {
    mongoose.connect(dbURI).then(
        () => { console.log("Mongoose is connected to CineDex"); },
        err => { console.log("Mongoose connection error:", err); }
    );
} catch (e) {
    console.log("Could not connect to MongoDB");
}


require('./movies');
require('./users');
const mongoose = require("mongoose");

const host = "localhost";
const port = 27017;
const dbName = "traveller";
const connectionString = `mongodb://${host}:${port}/${dbName}`;

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = mongoose;
const mongoose = require("mongoose");

const host = "localhost";
const port = 27017;
const dbName = "traveller";
const username = "admin";
const password = "admin";
// const connectionString = `mongodb://${host}:${port}/${dbName}`;

const connectionString = `mongodb://${username}:${password}@traveler-shard-00-00.ikm1y.mongodb.net:27017,traveler-shard-00-01.ikm1y.mongodb.net:27017,traveler-shard-00-02.ikm1y.mongodb.net:27017/test?replicaSet=atlas-1xat86-shard-0&ssl=true&authSource=admin`

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = mongoose;
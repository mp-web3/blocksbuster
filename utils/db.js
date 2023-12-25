/*const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let db;

async function connectToMongoDB() {
    try {
        await client.connect();
        db = client.db("blocksbuster");
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}

module.exports = { connectToMongoDB, db };
*/

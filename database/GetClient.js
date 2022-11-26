const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const url = process.env.DB_URL;
module.exports.GetClient = async() => {
    let db = await MongoClient.connect(url, { maxPoolSize: 20 })
    let client = db.db("Shortner");
    return client
}
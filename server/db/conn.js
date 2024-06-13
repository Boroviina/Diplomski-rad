const {MongoClient} = require('mongodb');
require('dotenv').config();
const connectionString = process.env.ATLAS_URI || "";



const client = new MongoClient(connectionString);

let conn;

async function connectionToDatabase() {
    if (!conn) {
        try {
            await client.connect();
            conn = client.db('database1');
            console.log('Successfully connected to MongoDB');

            // const collections = await conn.listCollections().toArray();
            // console.log('Kolekcije u bazi podataka:', collections);
        } catch (e) {
            console.error(e);
            console.error('Could not connect to MongoDB:', e);
        }
    }
    return conn;
}


// let db = conn.db('database1');
module.exports = connectionToDatabase;
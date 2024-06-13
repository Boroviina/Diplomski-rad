const express = require('express');
require('dotenv').config();
const connectionToDatabase = require('./db/conn');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const passport = require('passport');
const {jwtStrategy} = require('./config/passport');
const cors = require('cors');

const routes = require('./routes');

const app = express();
app.use(cors());    //da omoguci zahtjeve sa fronta
const port = process.env.PORT || 3001;


app.use(express.json()); // we specified that JSON data will be used in the application.
app.use(express.urlencoded({extended: true}));

app.use(passport.initialize());
passport.use('jwt', jwtStrategy);
app.use('/', routes);


async function startServer() {
    try {
        await connectionToDatabase();

        await mongoose.connect(process.env.ATLAS_URI)

        console.log('Connected to database');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        })
    } catch (error) {
        console.error('Failed to start server:', error);
    }
}

startServer();


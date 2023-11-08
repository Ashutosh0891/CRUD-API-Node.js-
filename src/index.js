const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./db');
const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes');
const functions = require("firebase-functions");

//creating the instance of express
const app = express();


dotenv.config(); // to populate process with env variables
const PORT = process.env.PORT;

//connection to mongoDB
connectDB();

//to parse the req body
app.use(express.json());

//routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

// creating the node server
app.listen(PORT, () => {
    console.log(`server is listening on http://localhost:${PORT}`)
});

exports.api = functions.https.onRequest(app);
const express = require('express'); // Setup Mongoose
const mongoose = require("mongoose"); // Setup Express
const cors = require('cors'); // Setup Cors
require('dotenv').config(); // Configure .env

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/warehouses', require('./routes/warehouses.route.js'));
app.use('/items', require('./routes/items.route.js'));

// Connect to Mongo
const connectToMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (err) {
        // connect to MongoDB failure
        console.error(err);
        process.exit(1); // immediately kill the server
    }
};
connectToMongo();

// Start listening for client
app.listen(process.env.PORT || 8080, () => {
    // This runs right as the app starts
    console.log(`Listening on port ${process.env.PORT || 8080}`);
});
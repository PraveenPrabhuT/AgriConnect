require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');

const app = express();
const port = process.env.PORT || 3000;

const mongoUri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

if (!mongoUri) {
    console.error("Error: MONGO_URI is not defined in the .env file.");
    process.exit(1);
}

mongoose.connect(mongoUri, {
    dbName: dbName
})
.then(() => {
    console.log(`Successfully connected to MongoDB database: ${dbName || mongoose.connection.name}`);
    startServer();
})
.catch(err => {
    console.error("Failed to connect to MongoDB with Mongoose", err);
    process.exit(1);
});

mongoose.connection.on('error', err => {
  console.error('Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected.');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', productRoutes);

app.use((err, req, res, next) => {
    console.error("Global Error Handler Caught:", err.stack);
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(val => val.message);
        return res.status(400).json({
            message: "Validation Error",
            errors: messages
        });
    }
    if (err.name === 'CastError') {
         return res.status(400).json({
            message: "Invalid ID format",
            error: err.message
         });
    }
    res.status(err.status || 500).json({
        message: "An internal server error occurred.",
        error: err.message
    });
});

function startServer() {
    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });
}

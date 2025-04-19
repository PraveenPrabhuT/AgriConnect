// server.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose'); // Import Mongoose
const productRoutes = require('./routes/productRoutes'); // Routes remain the same externally

// --- Express Setup ---
const app = express();
const port = process.env.PORT || 3000;

// --- Mongoose Connection ---
const mongoUri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME; // DB name is often part of the URI

if (!mongoUri) {
    console.error("Error: MONGO_URI is not defined in the .env file.");
    process.exit(1);
}

// Connect to MongoDB using Mongoose
mongoose.connect(mongoUri, {
    // No longer necessary in Mongoose 6+
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    dbName: dbName // Explicitly set DB name if not in URI or want to override
})
.then(() => {
    console.log(`Successfully connected to MongoDB database: ${dbName || mongoose.connection.name}`);
    // Start the server only after successful DB connection
    startServer();
})
.catch(err => {
    console.error("Failed to connect to MongoDB with Mongoose", err);
    process.exit(1);
});

// Optional: Listen for Mongoose connection events
mongoose.connection.on('error', err => {
  console.error('Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected.');
});

// --- Middleware ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// --- Routes ---
// Mount the product routes - they will now use the Mongoose model
app.use('/', productRoutes);

// --- Global Error Handler (Basic Example) ---
// Catches errors passed via next(err), including Mongoose validation errors
app.use((err, req, res, next) => {
    console.error("Global Error Handler Caught:", err.stack);
    // Handle Mongoose Validation Errors specifically
    if (err.name === 'ValidationError') {
        // Extract validation messages
        const messages = Object.values(err.errors).map(val => val.message);
        return res.status(400).json({
            message: "Validation Error",
            errors: messages
        });
    }
    // Handle Cast Errors (e.g., invalid ObjectId format)
    if (err.name === 'CastError') {
         return res.status(400).json({
            message: "Invalid ID format",
            error: err.message
         });
    }

    // Default to 500 server error
    res.status(err.status || 500).json({
        message: "An internal server error occurred.",
        error: err.message // Provide error message in development? Be cautious in production.
    });
    // Or send an HTML error page:
    // res.status(err.status || 500).sendFile(path.join(__dirname, 'views', 'error.html'));
});

// --- Starting the Server (called after successful DB connection) ---
function startServer() {
    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });
}

// Note: We don't call startServer() here directly anymore.
// It's called within the .then() block of mongoose.connect()

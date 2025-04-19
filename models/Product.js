// models/Product.js
const mongoose = require('mongoose');

// Define the schema for the Product collection
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required.'], // Add built-in validation
        trim: true // Remove leading/trailing whitespace
    },
    type: {
        type: String,
        required: [true, 'Product type is required.'],
        enum: ['seed', 'fertilizer', 'pesticide', 'equipment'], // Restrict possible values
        lowercase: true // Store type in lowercase
    },
    price: {
        type: Number,
        required: [true, 'Product price is required.'],
        min: [0, 'Price cannot be negative.'] // Add minimum value validation
    },
    description: {
        type: String,
        trim: true,
        default: '' // Default value if not provided
    },
    supplier: {
        type: String,
        required: [true, 'Supplier name is required.'],
        trim: true
    },
    imageUrl: {
        type: String,
        trim: true,
        // Default value is now handled in the route if URL is not provided
    }
}, {
    // Add timestamps (createdAt, updatedAt) automatically
    timestamps: true
});

// Create the Mongoose model
// Mongoose will automatically look for the plural, lowercased version of 'Product'
// -> 'products' collection in the database.
const Product = mongoose.model('Product', productSchema);

// Export the model to be used in other parts of the application
module.exports = Product;

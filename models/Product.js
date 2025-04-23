const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required.'],
        trim: true
    },
    type: {
        type: String,
        required: [true, 'Product type is required.'],
        enum: ['seed', 'fertilizer', 'pesticide', 'equipment'],
        lowercase: true
    },
    price: {
        type: Number,
        required: [true, 'Product price is required.'],
        min: [0, 'Price cannot be negative.']
    },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    supplier: {
        type: String,
        required: [true, 'Supplier name is required.'],
        trim: true
    },
    imageUrl: {
        type: String,
        trim: true,
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

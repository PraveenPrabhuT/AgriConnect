// routes/productRoutes.js
const express = require('express');
const path = require('path');
const Product = require('../models/Product'); // Import the Mongoose Product model

const router = express.Router();

// --- HTML Page Serving Routes (remain the same) ---

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});
router.get('/products', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'products.html'));
});
router.get('/add-product', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'));
});

// --- API Routes (using Mongoose) ---

// GET /api/products - Fetch all products using Mongoose
router.get('/api/products', async (req, res, next) => {
    try {
        // Use the Mongoose model to find all products
        // .sort() uses the field name from the schema ('createdAt')
        const products = await Product.find({}).sort({ createdAt: -1 }); // Mongoose returns documents directly
        res.json(products);
    } catch (err) {
        console.error("Error fetching products with Mongoose:", err);
        next(err); // Pass error to the global error handler
    }
});

// POST /api/products - Add a new product using Mongoose
router.post('/api/products', async (req, res, next) => {
    try {
        const { name, type, price, description, supplier, imageUrl } = req.body;

        // Prepare product data (Mongoose will apply defaults from schema)
        const productData = {
            name,
            type,
            price,
            description,
            supplier,
            // Set default image URL if not provided
            imageUrl: imageUrl ? imageUrl.trim() : `https://placehold.co/600x400/a2e4b8/333333?text=${encodeURIComponent(name || 'Product')}`
        };

        // Create and save the new product using the Mongoose model
        // Mongoose automatically runs schema validations here
        const newProduct = await Product.create(productData);

        console.log(`Created product with Mongoose: ${newProduct._id}`);
        res.redirect('/products'); // Redirect after successful creation

    } catch (err) {
        console.error("Error adding product with Mongoose:", err);
        // If it's a Mongoose validation error, it will be handled by the global error handler
        next(err); // Pass error (including validation errors) to the global handler
    }
});

// DELETE /api/products/:id - Remove a product using Mongoose
router.delete('/api/products/:id', async (req, res, next) => {
    try {
        const productId = req.params.id;

        // Use Mongoose's findByIdAndDelete method
        // Mongoose automatically handles casting the string ID to ObjectId
        // and checks for valid format. If invalid, it throws a CastError.
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (deletedProduct) {
            console.log(`Deleted product with Mongoose: ${productId}`);
            res.status(200).json({ message: 'Product deleted successfully', id: productId });
        } else {
            // If findByIdAndDelete returns null, the product wasn't found
            return res.status(404).json({ message: 'Product not found.' });
        }

    } catch (err) {
        // Catches CastError (invalid ID format) and other potential errors
        console.error(`Error deleting product with Mongoose (ID: ${req.params.id}):`, err);
        next(err); // Pass error to the global error handler
    }
});

module.exports = router;

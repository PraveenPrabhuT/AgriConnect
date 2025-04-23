const express = require('express');
const path = require('path');
const Product = require('../models/Product');

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});
router.get('/products', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'products.html'));
});
router.get('/add-product', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'));
});

router.get('/api/products', async (req, res, next) => {
    try {
        const products = await Product.find({}).sort({ createdAt: -1 });
        res.json(products);
    } catch (err) {
        console.error("Error fetching products with Mongoose:", err);
        next(err);
    }
});

router.post('/api/products', async (req, res, next) => {
    try {
        const { name, type, price, description, supplier, imageUrl } = req.body;

        const productData = {
            name,
            type,
            price,
            description,
            supplier,
            imageUrl: imageUrl ? imageUrl.trim() : `https://placehold.co/600x400/a2e4b8/333333?text=${encodeURIComponent(name || 'Product')}`
        };

        const newProduct = await Product.create(productData);

        console.log(`Created product with Mongoose: ${newProduct._id}`);
        res.redirect('/products');

    } catch (err) {
        console.error("Error adding product with Mongoose:", err);
        next(err);
    }
});

router.delete('/api/products/:id', async (req, res, next) => {
    try {
        const productId = req.params.id;

        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (deletedProduct) {
            console.log(`Deleted product with Mongoose: ${productId}`);
            res.status(200).json({ message: 'Product deleted successfully', id: productId });
        } else {
            return res.status(404).json({ message: 'Product not found.' });
        }

    } catch (err) {
        console.error(`Error deleting product with Mongoose (ID: ${req.params.id}):`, err);
        next(err);
    }
});

module.exports = router;

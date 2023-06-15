const express = require('express');
const router = express.Router();
const productController = require('../controllers/workshoAPI');

// Add a product
router.post('/api/addProduct', productController.addProduct);

// Get a product by ID
router.get('/api/getProduct/:productId', productController.getProduct);

// Delete a product by ID
router.delete('/api/deleteProduct/:productId', productController.deleteProduct);

// Update a product by ID
router.put('/api/updateProduct/:productId', productController.updateProduct);

module.exports = {workShopApiRouter:router};

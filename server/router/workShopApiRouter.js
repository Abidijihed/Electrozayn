const express = require('express');
const router = express.Router();
const productController = require('../controllers/workshoAPI');

// Add a product
router.post('/api/addProduct', productController.addProduct);

// Get a product by ID
router.get('/api/getProduct', productController.getProduct);

// Delete a product by ID
router.delete('/api/deleteProduct/:id', productController.deleteProduct);

// Update a product by ID
router.put('/api/updateProduct/:id', productController.updateProduct);

module.exports = {workShopApiRouter:router};

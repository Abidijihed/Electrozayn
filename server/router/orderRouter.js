const router = require('express').Router();
const orderController = require('../controllers/order');

// Route for creating an order
router.post('/api/create/order/:id', orderController.CreateOrder);

// Route for getting all orders
router.get('/api/get_all_order', orderController.getAllOrder);

// Route for updating an order
router.put('/api/update/order/:id', orderController.updateOrder);

// Route for confirming an order
router.put('/api/confirm/order/:id', orderController.confirmOrder);

// Route for deleting an order
router.delete('/api/delete/:id', orderController.deleteOrder);

// Route for getting all orders for a specific user
router.get('/api/get_user_order/:id', orderController.getAllOrderUser);

router.get('/api/order_items',orderController.getOrderItems)
module.exports = { orderRouter: router };

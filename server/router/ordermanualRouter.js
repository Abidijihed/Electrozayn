const router =require("express").Router()
const orderManueal=require('../controllers/createmanualorder')

// Route for creating a new order
router.post('/api/create-order', orderManueal.createOrderManual);

// Route for fetching order details and items for generating the invoice
// router.get('/api/invoice/:id', orderManueal.getInvoiceData);

module.exports={ordermanualRouter:router}
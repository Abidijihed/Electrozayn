const router=require('express').Router();
const postrouter=require('../controllers/product');

router.post('/api/Create/Nenw/product',postrouter.createPost);
router.get('/api/getAll/product',postrouter.getAllProduct);
router.put('/api/update/product/:id',postrouter.UpdateProduct);
router.delete("/api/delete/product/:id",postrouter.DeleteProduct);

module.exports={PosteRouter:router}


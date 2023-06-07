const router=require('express').Router();
const postrouter=require('../controllers/product');

router.post('/api/Create/Nenw/product',postrouter.createPost);
router.get('/api/getAll/product',postrouter.getAllProduct);
router.put('/api/update/product/:id',postrouter.UpdateProduct);
router.delete("/api/delete/product/:id",postrouter.DeleteProduct);
router.post('/api/product/added_to/card/:id',postrouter.AddToCart);
 router.get('/api/product/card',postrouter.getCard);
 router.put('/api/update/card/:id',postrouter.UpdateProductCard);
 router.put('/api/update/quantity/:id',postrouter.updatequantity);

 
module.exports={PosteRouter:router};


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

 router.post('/api/product/add_to_shop_card/:id',postrouter.AddToCart1);
 router.get('/api/get_product/card',postrouter.getCard1);
 router.get('/api/get_all_shopcard/card',postrouter.getCardalllshopcard);
 router.put('/api/update/shop_card/:id',postrouter.UpdateProductCard1);

module.exports={PosteRouter:router};


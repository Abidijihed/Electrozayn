const router=require('express').Router();
const productController=require('../controllers/product');

router.post('/api/Create/Nenw/product',productController.createPost);
router.get('/api/getAll/product',productController.getAllProduct);
router.put('/api/update/product/:id',productController.UpdateProduct);
router.delete("/api/delete/product/:id",productController.DeleteProduct);
 router.put('/api/update/quantity/:id',productController.updatequantity);
router.get('/api/get_one_product/:id',productController.GetOnePRoduct)

 router.post('/api/product/add_to_shop_card/:id',productController.AddToCart);
 router.get('/api/get_product/card',productController.getCard);
 router.get('/api/get_all_shopcard/card',productController.getCardalllshopcard);
 router.put('/api/update/shop_card/:id',productController.UpdateProductCard);
router.put('/api/update_quantity/:id',productController.updatequantity)
router.delete('/api/delete_shop_card/:id',productController.DeleteAllShopCArd)
module.exports={PosteRouter:router};


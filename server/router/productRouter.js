const router=require('express').Router();
const productController=require('../controllers/product');

router.post('/api/Create/New/product',productController.createPost);
router.get('/api/getAll/product',productController.getAllProduct);
router.put('/api/update/product/:id',productController.UpdateProduct);
router.delete("/api/delete/product/:id",productController.DeleteProduct);
 router.put('/api/update/quantity/:id',productController.updatequantity);
router.get('/api/get_one_product/:id',productController.GetOnePRoduct)
router.put('/api/remove_from_card/products/:id',productController.removefromcard);
 router.post('/api/add_to_card/products/:id',productController.AddToCart);
 router.put('/api/update/Stockquantity/:id',productController.UpdateStockquantity)

 router.get('/api/get_product/card/:id',productController.getCard);
 router.get('/api/get_all_shopcard/card',productController.getCardalllshopcard);
router.put('/api/update_quantity/:id',productController.updatequantity)
router.delete('/api/delete_shop_card/:id',productController.DeleteAllShopCArd)


router.post("/api/add_thumbnailes/images/:id",productController.AddmoreImageProduct)
router.get("/api/get_all_images/:id",productController.getAllimages)
router.delete("/api/delete_images/:id",productController.DeleteImages)

module.exports={PosteRouter:router};


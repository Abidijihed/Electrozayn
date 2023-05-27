const router=require('express').Router();
const postrouter=require('../controllers/product')
router.post('/api/Create/Nenw/product',postrouter.createPost);
router.get('/api/getAll/product',postrouter.getAllProduct);

module.exports={PosteRouter:router}


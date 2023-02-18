const router=require('express').Router();
const postrouter=require('../controllers/product')
router.post('/api/Create/Nenw/product',postrouter.createPost);

module.exports={PosteRouter:router}


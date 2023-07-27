const router =require('express').Router()
const controllerUser=require('../controllers/user')

router.post('/api/Create_user/electrozayn',controllerUser.CreateUser)
router.post('/api/electrozayn/login',controllerUser.LoginUser)
router.get('/api/user/getone/:id',controllerUser.getoneuser)
router.get('/api/logout',controllerUser.logout)
// newsletter
router.post("/api/user/newsletter",controllerUser.newsletterUser)
module.exports={userRoter:router}
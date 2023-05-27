const router =require('express').Router()
const controllerUser=require('../controllers/user')

router.post('/api/Create_user/electrozayn',controllerUser.CreateUser)
router.post('/api/electrozayn/login',controllerUser.LoginUser)
router.get('/api/user/getone/:id',controllerUser.getoneuser)
module.exports={userRoter:router}
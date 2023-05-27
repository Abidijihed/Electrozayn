const sessionContrller=require('../controllers/session')
module.exports={
    CreateSession:((req,res,user_id,session)=>{
        sessionContrller.post(user_id,session)
        .then((result)=>{
            res.cookie("Electrozyne",session,{
                path: '/',
                expires: new Date(new Date().getTime() + 86400 * 1000),
                httpOnly: false,
                Electrozyne: false
            }).send([session,"secsuss",user_id])
        })
        .catch((err)=>{
           res.send(err)
        })
    }),
    VerifySession:(req,res,next)=>{
        if(req.cookies.Electrozyne){
            sessionContrller.Get(req.cookies.Electrozyne)
            .then((result)=>{
                if(result.length>0&&(result[0].date>Date.now())){
                    var registerInfo={
                        user_id:result[0].user_id,
                        session:result[0].session,
                    }
                    res.status(201).send(registerInfo)
                }else{
                    res.status(400).send('seesion login fail')
                }
            })
            .catch((err)=>{
                res.status(500).send(err)
            })
        }else{
            res.status(400).send('session login fail')
        }
    }
}
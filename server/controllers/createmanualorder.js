const {connection}=require('../databaseconfig/config')

module.exports={
   // ... (other code)

createOrderManual:((req,res)=>{
  const query=`select * from products where reference =${req.body.reference}`
  connection.query(query,(err,result)=>{
    if(err){
      res.status(500).send(err)
    }else{
      console.log(result)
      const query=`isert into userorderManual (FirstName,Email,address,PhoneNumber,country,Zip,total_price) values("${req.body.FirstName}","${req.body.Email}","${req.body.address}","${req.body.PhoneNumber}","${req.body.country}","${req.body.Zip}",${req.body.total_price})`
      connection.query(query,(err,result)=>{
        if(err){
          res.status(500).send(err)
        }else{
          console.log(result)
        }
      })
    }
  })
})


}
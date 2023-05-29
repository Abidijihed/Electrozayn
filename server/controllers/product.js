const {connection}=require('../databaseconfig/config')
module.exports={
    createPost:((req,res)=>{
        const query = `INSERT INTO products(product_name,description,Origin_price,quantity,Promo_price,reference, product_image,availibility,catigory) VALUES("${req.body.product_name}","${req.body.description}","${req.body.Origin_price}","${req.body.quantity}","${req.body.Promo_price}","${req.body.reference}","${req.body.product_image}","${req.body.availibility}","${req.body.catigory}")`
        connection.query(query,(err,result)=>
          (err)?res.status(500).send(err):res.status(201).send('poste done')
        )
      }),
      getAllProduct:((req,res)=>{
        const query='select * from products'
        connection.query(query,(err,result)=>{
          err ? res.status(500).send(err):res.status(201).send(result)
        })
      }),
      UpdateProduct:((req,res)=>{
        var {product_name,description,Origin_price,quantity,Promo_price,reference,product_image,availibility,catigory}=req.body
     console.log(req.body)
        const query=`SELECT * FROM products WHERE id=${req.params.id}`
        connection.query(query,(err,result)=>{
          console.log(result)
          if(err){
            res.status(500).send(err)
          }else{
            console.log(result[0])
           product_name === undefined ? result[0].product_name : product_name
           description === undefined ? result[0].description : description
           Origin_price === undefined ? result[0].Origin_price : Origin_price
           quantity === undefined ? result[0].quantity : quantity
           Promo_price === undefined ? result[0].Promo_price : Promo_price
           reference === undefined ? result[0].reference : reference
           product_image === undefined ? result[0].product_image : product_image
           availibility === undefined ? result[0].availibility : availibility
           catigory === undefined ? result[0].catigory : catigory
           const query=`UPDATE products SET product_name="${req.body.bigTitle}",description="${req.body.title}",Origin_price="${req.body.content}",quantity="${req.body.imagees}",Promo_price="${Promo_price}",reference="${reference}",product_image="${product_image}"availibility="${availibility}",catigory="${catigory}" WHERE id=${req.params.id}`
           connection.query(query,(err,result)=>{
            console.log(result)
            err ? res.status(500).send(err):res.status(201).send("product updated")
           })
          }
        })

      })
    }
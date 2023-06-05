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
   
           const query=`UPDATE products SET product_name="${product_name}",description="${description}",Origin_price="${Origin_price}",quantity="${quantity}",Promo_price="${Promo_price}",reference="${reference}",product_image="${product_image}",availibility="${availibility}",catigory="${catigory}" WHERE id=${req.params.id}`
           connection.query(query,(err,result)=>{
            err ? res.status(500).send(err):res.status(201).send("product updated")
           })
          }),
      DeleteProduct:((req,res)=>{
        const query=`DELETE FROM products WHERE id=${req.params.id}`
        connection.query(query,(err,result)=>{
          err ? res.status(500).send(err):res.status(200).send("product deleted")
        })
      }),
      AddTocard:((req,res)=>{
        const query=`INSERT INTO addtocart(product_name,Origin_price,Promo_price,reference,check_add_or_not, product_image,user_id) VALUES("${req.body.product_name}","${req.body.Origin_price}","${req.body.Promo_price}","${req.body.reference}","${req.body.check_add_or_not}","${req.body.product_image}",${req.params.id})`
        connection.query(query,(err,result)=>{
          err? res.status(500).send(err):res.status(201).send("product added to card")
        })
      }),
      getCard:((req,res)=>{
        console.log(req.body)
        const query=`select * from addtocart where check_add_or_not=${req.body.check_add_or_not===true}`
        connection.query(query,(err,result)=>{
            err? res.status(500).send(err):res.status(201).send(result)
        })
      })
    
  }
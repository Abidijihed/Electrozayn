const { connection } = require("../databaseconfig/config");
module.exports = {
  createPost: (req, res) => {
    console.log(req.body)
    const query = `INSERT INTO products(product_name,description,Origin_price,quantity,stockquantity,Promo_price,reference, product_image,availibility,catigory) VALUES("${req.body.product_name}","${req.body.description}","${req.body.Origin_price}",${1},${req.body.stockquantity},"${req.body.Promo_price}","${req.body.reference}","${req.body.product_image}","${req.body.availibility}","${req.body.catigory}")`;
    connection.query(query, (err, result) =>
      err ? res.status(500).send(err) : res.status(201).send("poste done")
    );
  },
  getAllProduct: (req, res) => {
    const query = "select * from products";
    connection.query(query, (err, result) => {
      err ? res.status(500).send(err) : res.status(201).send(result);
    });
  },
  UpdateProduct: (req, res) => {
    var {
      product_name,
      description,
      Origin_price,
      quantity,
      stockquantity,
      Promo_price,
      reference,
      product_image,
      availibility,
      catigory,
    } = req.body;

    const query = `UPDATE products SET product_name="${product_name}",description="${description}",Origin_price="${Origin_price}",quantity=${1},stockquantity="${req.body.stockquantity}",Promo_price="${Promo_price}",reference="${reference}",product_image="${product_image}",availibility="${availibility}",catigory="${catigory}" WHERE id=${req.params.id}`;
    connection.query(query, (err, result) => {
      err ? res.status(500).send(err) : res.status(201).send("product updated");
    });
  },
  updatequantity:((req,res)=>{
     const query=`UPDATE products SET quantity = quantity - ${req.body.quantity} WHERE id = ${req.params.id}`
     connection.query(query,(err,result)=>{
      err?res.status(500).send(err):res.status(201).send("Quantity Updated")
     })
  }),
  DeleteProduct: (req, res) => {
    const query = `DELETE FROM products WHERE id=${req.params.id}`;
    connection.query(query, (err, result) => {
      err ? res.status(500).send(err) : res.status(200).send("product deleted");
    });
  },

AddToCart: (req, res) => {
  console.log(req.body)
  const query = `insert into shopcard (check_add_or_not,products_id,user_id) values(${req.body.check_add_or_not},${req.body.products_id},${req.params.id})`;
  connection.query(query, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    
    res.status(201).send("Product added to cart");
  });
},
removefromcard: ((req, res) => {
  console.log(req.params)
  const query = `UPDATE shopcard SET check_add_or_not = ${false} WHERE products_id = ${req.params.id}`;
  connection.query(query, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send("Product updated successfully");
    }
  });
}),
UpdateStockquantity:((req, res) => {
  const query = `UPDATE products SET stockquantity = ${req.body.stockQuantity} WHERE id =${req.params.id}`;

  connection.query(query,(error, results) => {
    if (error) {
      console.error('Error updating stock quantity:', error);
      return res.status(500).json({ error: 'Failed to update stock quantity' });
    }
    return res.json({ message: 'Stock quantity updated successfully' });
  });
  }),

getCard: (req, res) => {
  const query = `SELECT * FROM products WHERE id IN (SELECT products_id FROM shopcard WHERE check_add_or_not = ${true} and user_id=${req.params.id} )`;
  connection.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  });
},

getCardalllshopcard: (req, res) => {
  const query = `SELECT * FROM shopcard WHERE check_add_or_not = ${true}`;
  connection.query(query, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  });
},
DeleteAllShopCArd:((req,res)=>{
  const query=`delete from shopcard where product_id=${req.params.id}`
  connection.query(query,(err,result)=>{
    err ? res.status(500).send(err): res.status(200).send('deleted')
  })
}),
GetOnePRoduct:((req,res)=>{
const query=`select * from products where id =${req.params.id}`
connection.query(query,(err,result)=>{
  err ? res.status(500).send(err):res.status(200).send(result)
})
}),
AddmoreImageProduct: ((req, res) => {
  const query = `INSERT INTO product_images (product_image, products_id) VALUES ("${req.body.product_image}", ${req.params.id})`;
  connection.query(query, (err, result) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(201).send("Image added");
    }
  });
}),

getAllimages:((req,res)=>{
  const query=`select * from product_images where products_id=${req.params.id}`
  connection.query(query,(err,result)=>{
    err ? res.status(500).send(err):res.status(201).send(result)

  })
}),
DeleteImages:((req,res)=>{
  const query=`delete from product_images where id=${req.params.id}`
  connection.query(query,(err,result)=>{
    err ? res.status(500).send(err):res.status(202).send("image deleted")
  })
})


};

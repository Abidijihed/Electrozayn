const { connection } = require("../databaseconfig/config");

module.exports = {
  // Add a product to the table
  addProduct: (req, res) => {
    const { product_Name, product_Material, product_Image, category, quantity, Promo_price, Orginal_price } = req.body;
    const query = `INSERT INTO bijoux (product_Name, product_Material, product_Image, category, quantity, Promo_price, Orginal_price) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    connection.query(query, [product_Name, product_Material, product_Image, category, quantity, Promo_price, Orginal_price], (err, results) => {
     err? res.status(500).send(err):res.status(200).send('product added')
    });
  },

  // Get a product from the table by its ID
  getProduct: (req, res) => {
    const query = `SELECT * FROM bijoux`;
    connection.query(query, (err, results) => {
      err? res.status(500).send(err):res.status(200).send(results)

    });
  },

  // Delete a product from the table by its ID
  deleteProduct: (req, res) => {
    const query = `DELETE FROM bijoux WHERE id = ?`;
    connection.query(query, [req.params.id], (err, results) => {
      err? res.status(500).send(err):res.status(200).send('product deleted')

    });
  },

  // Update a product in the table by its ID
  updateProduct: (req, res) => {
    const { product_Name, product_Material, product_Image, category, quantity, Promo_price, Orginal_price } = req.body;
    const query = `UPDATE bijoux SET product_Name = ?, product_Material = ?, product_Image = ?, category = ?, quantity = ?, Promo_price = ?, Orginal_price = ? WHERE id = ?`;
    connection.query(query, [product_Name, product_Material, product_Image, category, quantity, Promo_price, Orginal_price, req.params.id], (err, results) => {
      err? res.status(500).send(err):res.status(200).send('product updated')

    });
  }
};

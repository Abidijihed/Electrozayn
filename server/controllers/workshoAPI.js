const { connection } = require("../databaseconfig/config");

module.exports = {
  // Add a product to the table
  addProduct: (productData, callback) => {
    const { product_Name, product_Material, product_Image, category, quantity, Promo_price, Orginal_price } = productData;
    const query = `INSERT INTO bijoux (product_Name, product_Material, product_Image, category, quantity, Promo_price, Orginal_price) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    connection.query(query, [product_Name, product_Material, product_Image, category, quantity, Promo_price, Orginal_price], (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  },

  // Get a product from the table by its ID
  getProduct: (productId, callback) => {
    const query = `SELECT * FROM bijoux WHERE id = ?`;
    connection.query(query, [productId], (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results[0]);
    });
  },

  // Delete a product from the table by its ID
  deleteProduct: (productId, callback) => {
    const query = `DELETE FROM bijoux WHERE id = ?`;
    connection.query(query, [productId], (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  },

  // Update a product in the table by its ID
  updateProduct: (productId, productData, callback) => {
    const { product_Name, product_Material, product_Image, category, quantity, Promo_price, Orginal_price } = productData;
    const query = `UPDATE bijoux SET product_Name = ?, product_Material = ?, product_Image = ?, category = ?, quantity = ?, Promo_price = ?, Orginal_price = ? WHERE id = ?`;
    connection.query(query, [product_Name, product_Material, product_Image, category, quantity, Promo_price, Orginal_price, productId], (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  }
};

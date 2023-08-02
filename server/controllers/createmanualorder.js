const {connection}=require('../databaseconfig/config')

module.exports={
   // ... (other code)
  // ... (other code)
createOrderManual: ((req, res) => {
  const { FirstName, Email, address, PhoneNumber, country, Zip, orderItems } = req.body;

  // Extract the product names from the orderItems array
  const productNames = orderItems.map((item) => item.productName);

  // Save the order and order items to the database
  const insertOrderQuery = `INSERT INTO userorderManual (FirstName, Email, address, PhoneNumber, country, Zip, total_price) VALUES ('${FirstName}', '${Email}', '${address}', '${PhoneNumber}', '${country}', '${Zip}', 0)`;

  connection.query(insertOrderQuery, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }

    const orderId = result.insertId;
    let totalPrice = 0;
    // Fetch all products with the given product names using the IN operator
    const query = `SELECT * FROM products WHERE product_name IN ('${productNames.join("','")}')`;
    connection.query(query, (err, productResult) => {
      if (err) {
        return res.status(500).send(err);
      }

      // Create a mapping of product names to their corresponding product data
      const productMap = {};
      productResult.forEach((product) => {
        productMap[product.product_name] = product;
      });

      // Calculate total price and insert order items
      const insertOrderItemsPromises = orderItems.map((item) => {
        const { productName, quantity } = item;
        const product = productMap[productName];
        if (product && (product.Promo_price || product.Origin_price)) {
          // Only calculate price for valid products with price properties
          const productPrice = Number(product.Promo_price) > 0 ? Number(product.Promo_price) : Number(product.Origin_price);
          const itemTotalPrice = quantity * productPrice;
          totalPrice += itemTotalPrice;
          return `INSERT INTO order_items_Manual (order_id, product_name, product_quantity, product_price) VALUES (${orderId}, "${productName}", ${quantity}, ${productPrice})`;
        }
        return null; // Skip invalid or missing products
      });

      // Remove queries with null (invalid or missing products)
      const filteredQueries = insertOrderItemsPromises.filter((query) => query !== null);

      if (filteredQueries.length === 0) {
        // No valid products found, send an error response or handle as per your requirements
        return res.status(404).json({ message: 'No valid products found in the database.' });
      }

      // Execute the multiple INSERT queries for order items
      const executeNextQuery = (index) => {
        if (index >= filteredQueries.length) {
          // All queries executed, update the total_price of the order
          connection.query(`UPDATE userorderManual SET total_price = ${totalPrice} WHERE id = ${orderId}`, (err) => {
            if (err) {
              return res.status(500).send(err);
            }
  
            console.log('Order created successfully!');
            res.json({ message: 'Order created successfully!' });
          });
          return;
        }

        connection.query(filteredQueries[index], (err) => {
          if (err) {
            return res.status(500).send(err);
          }
          executeNextQuery(index + 1);
        });
      };

      executeNextQuery(0);
    });
  });
})

  
  
}


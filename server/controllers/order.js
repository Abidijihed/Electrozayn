const { connection } = require("../databaseconfig/config");
const { usermail } = require("./EmailTouser");
const { nodmail } = require("./email");

module.exports = {
  CreateOrder: (req, res) => {
    const {
      FirstName,
      Email,
      address,
      PhoneNumber,
      country,
      Zip,
      total_price,
      products,
    } = req.body;
    const user_id = req.params.id;
    const validate_add_or_not = false;

    const query = `
      INSERT INTO userorder (validate_add_or_not, FirstName, Email, address, PhoneNumber, country, Zip, total_price, user_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    connection.query(
      query,
      [
        validate_add_or_not,
        FirstName,
        Email,
        address,
        PhoneNumber,
        country,
        Zip,
        total_price,
        user_id,
      ],
      (err, result) => {
        if (err) {
          res.status(500).send(err);
        } else {
          const orderId = result.insertId; // Get the newly inserted order ID

          // Save order items in the order_items table
          const orderItemsQuery = `
          INSERT INTO order_items (order_id, product_name, product_quantity, product_price)
          VALUES ?`;
        const orderItemsValues = products.map((product) => [
          orderId,
          product.product_name,
          product.quantity,
          product.Promo_price > 0
            ? Number(product.Promo_price) * Number(product.quantity)
            : Number(product.Origin_price) * Number(product.quantity),
        ]);
        
        connection.query(orderItemsQuery, [orderItemsValues], (err) => {
          if (err) {
            console.log(err);
            res.status(500).send(err);
            } else {
              const updateUserQuery = `
                UPDATE user
                SET FirstName = ?, Address = ?, country = ?, Zip = ?
                WHERE id = ?
              `;
              const updateUserValues = [
                FirstName,
                address,
                country,
                Zip,
                user_id,
              ];

              connection.query(
                updateUserQuery,
                updateUserValues,
                (err, result) => {
                  if (err) {
                    res.status(500).send(err);
                  } else {
                    res.status(201).send("user updated and order created");
                    nodmail(req.body);
                  }
                }
              );
            }
          });
        }
      }
    );
  },
  getAllOrder: (req, res) => {
    const query = 'SELECT * FROM userorder';

    // Execute the query to fetch all orders
    connection.query(query, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else {
        res.status(200).send(result);
      }
    });
  },
  updateOrder: (req, res) => {
    const { id } = req.params;
    const { FirstName, Email, PhoneNumber, country, Zip } = req.body;

    const query = `
          UPDATE userorder
          SET FirstName = ?, Email = ?, PhoneNumber = ?, country = ?, Zip = ?
          WHERE id = ?
        `;

    // Execute the query to update the order
    connection.query(query, [FirstName, Email, PhoneNumber, country, Zip, id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('An error occurred while updating the order');
      } else {
        res.status(200).send('info order updated');
      }
    });
  },
  deleteOrder: (req, res) => {
    const { id } = req.params;

    const query = `
          DELETE FROM userorder
          WHERE id = ?
        `;

    // Execute the query to delete the order
    connection.query(query, [id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send(err)
      } else {
        res.status(200).send("order deleted");
      }
    });
  },
  confirmOrder: (req, res) => {
    const { id } = req.params;

    const query = `
          UPDATE userorder
          SET validate_add_or_not = true
          WHERE id = ?
        `;

    // Execute the query to confirm the order
    connection.query(query, [id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else {
        res.status(200).send("order confirmed");
        usermail(req.body)
      }
    });

  
  },
  getAllOrderUser: (req, res) => {
    const query = `SELECT * FROM userorder WHERE user_id = ${req.params.id}`;

    // Execute the query to fetch all orders
    connection.query(query, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else {
        res.status(200).send(result);
      }
    });
  },
getOrderItems:((req,res)=>{
  const query=`select * from order_items`
  connection.query(query,(err,result)=>{
    err ? res.status(500).send(err):res.status(200).send(result)
  })
})




}
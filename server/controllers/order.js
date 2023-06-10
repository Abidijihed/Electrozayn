const { connection } = require("../databaseconfig/config");
module.exports={
    CreateOrder: (req, res) => {
      console.log(req.body)
        const { FirstName, Email,address, PhoneNumber, country, Zip,total_price,product_name,product_quantity } = req.body;
        const user_id = req.params.id
        const validate_add_or_not = false;
      
        const query = `
          INSERT INTO userorder (validate_add_or_not, FirstName, Email,address, PhoneNumber, country, Zip,total_price,product_name,product_quantity ,user_id)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
             connection.query(query, [validate_add_or_not, FirstName, Email,address, PhoneNumber, country, Zip,total_price,product_name,product_quantity, user_id], (err, result) => {
          if (err) {
           res.status(500).send(err)
          } else {
            const query=`UPDATE user SET FirstName="${FirstName}",Address="${address}",country="${country}",Zip="${Zip}" WHERE id=${req.params.id}`
            connection.query(query, (err, result) => {
                err ? res.status(500).send(err):res.status(201).send('user updated and order created')
            })
          }
        });
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
            res.status(500).send('An error occurred while updating the order' );
          } else {
            res.status(200).send('info order updated');
          }
        });
      },
      deleteOrder: (req, res) => {
        const { id } = req.params;
        const { user_id } = req.params;
      
        const query = `
          DELETE FROM userorder
          WHERE id = ? AND user_id = ?
        `;
      
        // Execute the query to delete the order
        connection.query(query, [id, user_id], (err, result) => {
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
      
      
      
      
      
}
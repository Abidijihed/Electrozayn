const nodemailer = require('nodemailer');
const pdf = require('html-pdf');
const fs = require('fs');

const transporter = nodemailer.createTransport({
  service: "gmail", //replace with your email provider
  port: 587,
  host: 'www.electrozayn.com',
  secure: false,
  auth: {
    user: "aymenaymoun86@gmail.com",
    pass: "qwmjhmeyidvopngu"
  },
  tls: {
    rejectUnauthorized: false,
  }
});

transporter.verify(function(error, success) {
  if (error) {
    console.log(error, 'ttt');
  } else {
    console.log("Server is ready to take our Messages");
  }
});


const usermail = (data, res) => {
  var info = data.order.filter((el) => el.user_id === data.userID && el.validate_add_or_not === 1);
  var info_order = data.orderItems.filter((el) => el.order_id === info[0].id);
  
  var FirstName = info[0].FirstName;
  var Email = info[0].Email;
  var PhoneNumber = info[0].PhoneNumber;
  var address = info[0].address;
  var code_Postale = info[0].Zip;
  var Total_price = info[0].total_price;
  var date = info[0].date;
  var data_order = info_order;
  var number_facture=info[0].id.toString().padStart(5, '0')
  let dynamicTableRows = '';

  data_order.forEach((item) => {
    dynamicTableRows += `
      <tr class="table-secondary">
        <td>${item.product_name}</td>
        <td>${item.product_price/item.product_quantity}</td>
        <td>${item.product_quantity}</td>
        <td>${item.product_price}</td>
      </tr>
    `;
  });

  let html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
     <style>
     body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      
      h2 {
        color: #333;
      }
      
      .table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
      }
      
      .table-secondary {
        background-color: #f9f9f9;
      }
      
      .table thead th {
        background-color: #ddd;
        font-weight: bold;
      }
      
      .table td, .table th {
        padding: 8px;
        border: 1px solid #ccc;
      }
      
      .table-group-divider .table-secondary {
        border-top: 2px solid #999;
      }
     </style>
      </head>
  <body>
  
    <figure class="text-center">
     <h3 style="float: right;">BL# ${number_facture}</h3>
     <div>
    <blockquote class="blockquote">
      <h2>BONJOUR ${FirstName} ,</h2>
    </blockquote>
    <figcaption class="blockquote-footer">
    <img src="http://res.cloudinary.com/dycjej355/image/upload/v1688464947/logo.3fa781df7c16dd72ccc5_fzepsj.png" alt="Logo" width="250px" heigth="130px">

    MERCI D'AVOIR EFFECTUÉ VOS ACHATS SUR Electrozayn!
    </figcaption>
    <div>
    </figure>
  
    <table class="table">
    <thead>
      <tr class="table-secondary">
        <th scope="col">DÉTAILS DE LA COMMANDE</th>
      </tr>
    </thead>
    <tbody class="table-group-divider">
      <tr class="table-secondary">
        <th scope="row">Commande : DRHQIOEPM passée le ${date}</th>
      </tr>
      <tr class="table-secondary">
        <th scope="row">
          Paiement : Paiement comptant à la livraison (Cash à la livraison) (en attente de validation)</th>
      </tr>
    </tbody>
    </table>   
    <br>
    <table class="table">
    <thead>
      <tr class="table-secondary">
        <th scope="col">Nom De Produit</th>
        <th scope="col">Prix unitaire</th>
        <th scope="col">Quantité</th>
        <th scope="col">Prix total</th>
      </tr>
    </thead>
    <tbody>
       <tr>
        <th scope="row"></th>
        <td></td>
        <td></td>
        <td></td>
      </tr>
   ${dynamicTableRows}
      <tr>
        <th scope="row"></th>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr class="table-secondary">
        <th scope="row"></th>
        <td></td>
        <td></td>
        <td>Produits</td>
        <td>${Total_price} TND	 </td>
      </tr>
      <tr class="table-secondary">
        <th scope="row"></th>
        <td></td>
        <td></td>
        <td>Réductions</td>
        <td>0,000 TND</td>
      </tr>
      <tr class="table-secondary">
        <th scope="row"></th>
        <td></td>
        <td></td>
        <td>Paquet cadeau</td>
        <td>0,000 TND</td>
      </tr>
      <tr class="table-secondary">
        <th scope="row"></th>
        <td></td>
        <td></td>
        <td>Livraison</td>
        <td>0,000 TND</td>
      </tr>
      <tr class="table-secondary">
        <th scope="row"></th>
        <td></td>
        <td></td>
        <td>TVA totale</td>
        <td>${Total_price*0.19} TND</td>
      </tr>
      <tr class="table-secondary">
        <th scope="row"></th>
        <td></td>
        <td></td>
        <td>Total payé (including TVA)</td>
        <td>${Total_price} TND	 </td>
      </tr>
    </tbody>
    </table>
    <br>
    <table class="table">
    <thead>
      <tr class="table-secondary">
        <th scope="col">LIVRAISON</th>
      </tr>
    </thead>
    <tbody class="table-group-divider">
      <tr class="table-secondary">
        <th scope="row">Transporteur : </th>
      </tr>
      <tr class="table-secondary">
        <th scope="row">
          Paiement : Paiement comptant à la livraison (Cash à la livraison) (en attente de validation)</th>
      </tr>
    </tbody>
    </table>
    <br>
    <div class="">
    <table class="table-sm">
    <thead class="table-light">
      <tr class="table-secondary">
        <th scope="col">ADRESSE DE LIVRAISON && FACTURATION</th>
      </tr>
    </thead>
    <tbody class="table-group-divider">
      <tr class="table-secondary">
        <th scope="row">${FirstName} <br>
                        Aymen& ${FirstName} <br>
                        ${address} <br>
                        ${code_Postale} <br>
                        Tunisie <br>
                        ${PhoneNumber}</th>
      </tr>
    </tbody>
    </table>
    </div>
  
  </body>
  </html>
`;
  
pdf.create(html).toFile(__dirname,'./order.pdf', function(err, result) {
    if (err) {
      console.log(err);
    //   res.json({
    //     status: 'fail'
    //   });
    } else {
      console.log(result);
      // Read the generated PDF file
      const pdfData = fs.readFileSync(__dirname,'./order.pdf');

      var mail = {
        from: "aymenaymoun86@gmail.com",
        to: Email,
        subject: "Order Confirmed",
        html: html,
        attachments: [
          {
            filename: "order.pdf",
            content: pdfData,
            contentType: 'application/pdf'
          }
        ]
      };

      transporter.sendMail(mail, (err, data) => {
        if (err) {
            console.log(err)
          res.json({
            status: 'fail'
          });
        } else {
          res.json({
            status: 'success'
          });
        }
      });
    }
  });
};

module.exports = {
  usermail,
};

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: "gmail", //replace with your email provider
  port: 587,
  host: 'smtp.gmail.com',
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

const nodmail = async (data, next) => {
  console.log(data);
  var FirstName = data.FirstName;
  var Email = data.Email;
  var PhoneNumber = data.PhoneNumber;
  var address = data.address;
  var code_Podtale = data.Zip;
  var Total_price = data.total_price;
  var product_name = data.product_name;
  var quantity = data.product_quantity;

  let html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Acme Web Design</title>
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.css" />
    <style>
      .container {
        text-align: center;
      }
      
      .brand {
        font-size: 24px;
        font-weight: bold;
      }
      
      .wrapper {
        margin-top: 20px;
      }
      
      .wrapper img {
        width: 500px;
        height: 333px;
      }
      
      .wrapper p {
        margin: 10px 0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1 class="brand">Order</h1>
      <h1>From: ${FirstName}</h1>
      <p>${Email}</p>
      <div class="wrapper animated bounceInLeft">
        <img src="http://res.cloudinary.com/dycjej355/image/upload/v1688464947/logo.3fa781df7c16dd72ccc5_fzepsj.png" alt="Logo">
        <p>Phone Number: ${PhoneNumber}</p>
        <p>Address: ${address}</p>
        <p>Postal Code: ${code_Podtale}</p>
        <p>Total Price: ${Total_price}</p>
        <p>Product Name: ${product_name}</p>
        <p>Quantity: ${quantity}</p>
      </div>
    </div>
  </body>
  </html>
  `;

  var mail = {
    from: Email,
    to: "aymenaymoun86@gmail.com",
    subject: "New Order",
    html: html,
    attachments: [
      {
        filename: "order.json",
        content: JSON.stringify(data),
        contentType: 'application/json'
      }
    ]
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: 'fail'
      });
    } else {
      res.json({
        status: 'success'
      });
    }
  });
};

module.exports = {
  nodmail,
};

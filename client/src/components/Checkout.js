import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  makeStyles,
  Typography,
  Button,
  CircularProgress,
} from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '1rem',
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  image: {
    marginRight: '1rem',
    width: '50px',
    height: '50px',
    objectFit: 'cover',
  },
  total: {
    marginTop: '1rem',
    fontWeight: 'bold',
  },
});

export default function Checkout() {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('pay_on_delivery');
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('https://www.electrozayn.com/api/get_product/card').then((res) => {
      console.log(res.data)
      setProducts(res.data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const totalPrice = products.reduce((sum, product) => sum + Number(product.Promo_price), 0);
    setTotal(totalPrice);
  }, [products]);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleTotal = () => {
    if (paymentMethod === 'pay_on_delivery') {
      return total + 7;
    }
    return total;
  };

  const handleValidation = () => {
    // Perform validation logic here
    // Show confirmation alert
    alert('Confirmation: Your order has been validated.');
  };

  const handleIncreaseQuantity = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      })
    );
  };

  const handleDecreaseQuantity = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id === productId && product.quantity > 0) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      })
    );
  };

  return (
    <div className={classes.root}>
      <Typography variant="h6">Checkout</Typography>
      {isLoading ? (
        <CircularProgress />
      ) : (
        products.map((product) => (
          <Card key={product.id} className={classes.card}>
            <img src={product.product_image} alt={product.product_name} className={classes.image} />
            <CardContent>
              <Typography variant="subtitle1">{product.product_name}</Typography>
              <Typography variant="caption">{product.reference}</Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Promo Price: {product.Promo_price} TND
              </Typography>
              <div>
                <Button onClick={() => handleDecreaseQuantity(product.id)}>-</Button>
                <Typography>{product.quantity}</Typography>
                <Button onClick={() => handleIncreaseQuantity(product.id)}>+</Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
      <FormControlLabel
        control={
          <Checkbox
            checked={paymentMethod === 'pay_on_delivery'}
            onChange={handlePaymentMethodChange}
            value="pay_on_delivery"
          />
        }
        label="Pay on Delivery"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={paymentMethod === 'pay_with_card'}
            onChange={handlePaymentMethodChange}
            value="pay_with_card"
          />
        }
        label="Pay with Card"
      />
      <Typography variant="h6" className={classes.total}>
        Total: {handleTotal()} TND
      </Typography>
      <Button variant="contained" color="primary" onClick={handleValidation}>
        Validate Order
      </Button>
    </div>
  );
}

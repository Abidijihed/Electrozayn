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

export default function Checkout({ getlengthShop }) {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('pay_on_delivery');
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('https://www.electrozayn.com/api/get_product/card').then((res) => {
      const productsWithQuantity = res.data.map((product) => ({
        ...product,
        quantity: 1, // Initialize quantity as 1 for each product
      }));
      setProducts(productsWithQuantity);
      setIsLoading(false);
    });
    getlengthShop();
  }, []);

  useEffect(() => {
    const totalPrice = products.reduce(
      (sum, product) => sum + Number(product.Promo_price) * product.quantity,
      0
    );
    setTotal(totalPrice);
  }, [products]);
  
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };
  const handleTotal = () => {
    if (isLoading || products.length === 0) {
      return 0;
    }
    if (paymentMethod === 'pay_on_delivery') {
      return total + 7;
    }
    return total;
  };
  

  const incrementQuantity = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, quantity: product.quantity + 1 } : product
      )
    );
  };

  const decrementQuantity = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  const updateQuantityOnServer = (productId, quantity) => {
    axios
      .put(`https://www.electrozayn.com/api/update_quantity/${productId}`, { quantity })
      .then((res) => {
        console.log(res.data); // Quantity Updated
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleValidation = () => {
    products.forEach((product) => {
      updateQuantityOnServer(product.id, product.quantity);
    });
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
              
              <div style={{ display: 'flex' }}>
                <Button onClick={() => incrementQuantity(product.id)}>+</Button>
                <Typography>{product.quantity}</Typography>
                <Button onClick={() => decrementQuantity(product.id)}>-</Button>
              </div>
              <Typography variant="body2" color="black" component="h3">
                
                Total: {Number(product.Promo_price) * Number(product.quantity)} TND
              </Typography>
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
        Total Price: {handleTotal()} TND
      </Typography>
      <Button variant="contained" color="primary" onClick={handleValidation}>
        Validate Order
      </Button>
    </div>
  );
}

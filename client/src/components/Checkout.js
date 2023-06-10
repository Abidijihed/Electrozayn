import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  makeStyles,
  Typography,
  Button,
  CircularProgress,
} from "@material-ui/core";
import CheckoutValidation from "./CheckoutValidation";
import axios from "axios";
import { TiDelete } from "react-icons/ti";
const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "1rem",
  },
  card: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1rem",
  },
  image: {
    marginRight: "1rem",
    width: "50px",
    height: "50px",
    objectFit: "cover",
  },
  total: {
    marginTop: "1rem",
    fontWeight: "bold",
  },
  deleteIcon: {
    marginRight: "13px",
    fontSize: "25px",
    cursor: "pointer",
  },
});

export default function Checkout({ getlengthShop }) {
  const classes = useStyles();
  const [openCheckoutValidation, setOpenCheckoutValidation] = useState(false);
  const [products, setProducts] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("pay_on_delivery");
  const [totalPrice, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://www.electrozayn.com/api/get_product/card")
      .then((res) => {
        const productsWithQuantity = res.data.map((product) => ({
          ...product,
          quantity: 1, // Initialize quantity as 1 for each product
        }));
        setProducts(productsWithQuantity);
        setIsLoading(false);
      });
    getlengthShop();
  }, []);

  const handleUpdate = (id) => {
    axios
      .put(`https://www.electrozayn.com/api/update/shop_card/${id}`)
      .then((res) => {
        setProducts(products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const totalPrice = products.reduce(
      (sum, product) => sum + Number(product.Promo_price) * product.quantity,
      0
    );
    setTotal(totalPrice);
  }, []);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };
  const handleTotal = () => {
    if (isLoading || products.length === 0) {
      return 0;
    }
    
    let totalPrice = 0;
    
    products.forEach((product) => {
      const productTotal = Number(product.Promo_price) * Number(product.quantity);
      totalPrice += productTotal;
    });
  
    if (paymentMethod === "pay_on_delivery") {
      totalPrice += 7;
    }
  
    return totalPrice;
  };
  

  const incrementQuantity = (productId) => {
    console.log(productId);

    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
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
      .put(`https://www.electrozayn.com/api/update_quantity/${productId}`, {
        quantity,
      })
      .then((res) => {
        toast.success("Success Notification !", {
          position: toast.POSITION.TOP_RIGHT,
        }); // Quantity Updated
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
      <ToastContainer />
      <Typography variant="h6">Checkout</Typography>
      {isLoading ? (
        <CircularProgress />
      ) : (
        products.map((product) => (
          <Card key={product.id} className={classes.card}>
            <img
              src={product.product_image}
              alt={product.product_name}
              className={classes.image}
            />
            <CardContent>
              <Typography variant="subtitle1">
                {product.product_name}
              </Typography>
              <Typography variant="caption">{product.reference}</Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Promo Price: {product.Promo_price} TND
              </Typography>

              <div style={{ display: "flex" }}>
                <Button onClick={() => incrementQuantity(product.id)}>+</Button>
                <Typography>{product.quantity}</Typography>
                <Button onClick={() => decrementQuantity(product.id)}>-</Button>
              </div>
              <Typography variant="body2" color="black" component="h3">
                Total: {Number(product.Promo_price) * Number(product.quantity)}{" "}
                TND
              </Typography>
            </CardContent>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                color: "red",
              }}
            >
              <TiDelete
                className={classes.deleteIcon}
                onClick={() => handleUpdate(product.id)}
              />
            </div>
          </Card>
        ))
      )}
      <FormControlLabel
        control={
          <Checkbox
            checked={paymentMethod === "pay_on_delivery"}
            onChange={handlePaymentMethodChange}
            value="pay_on_delivery"
          />
        }
        label="Pay on Delivery"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={paymentMethod === "pay_with_card"}
            onChange={handlePaymentMethodChange}
            value="pay_with_card"
          />
        }
        label="Pay with Card"
      />
      <Typography variant="h6" className={classes.total}>
        Total Price: {handleTotal()} {" "} TND
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenCheckoutValidation(true)}
      >
        Validate Order
      </Button>
      <CheckoutValidation
        open={openCheckoutValidation}
        handleClose={() => setOpenCheckoutValidation(false)}
        totalPrice={totalPrice}
        products={products}
        handleValidation={handleValidation}
      />
    </div>
  );
}

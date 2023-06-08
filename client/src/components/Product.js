import React, { useEffect, useState } from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  makeStyles,
  CircularProgress
} from '@material-ui/core';
import { Button } from 'react-bootstrap';
import AddProductModal from './UpdateModal';
import axios from 'axios';
import { FaShoppingCart } from 'react-icons/fa';
import Swal from 'sweetalert2';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    flex: '0 0 calc(33.33% - 1rem)',
    marginTop: '50px',
    marginBottom: '1rem',
    marginRight: '1rem',
    marginLeft: '1rem',
    display: 'inline-block',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    position: 'relative',
    width: '450px',
  },
  media: {
    height: 200,
    width: '100%',
    objectFit: 'cover',
    backgroundImage: 'none',
  },
  shopIcon: {
    marginRight: '13px',
    marginBottom: '6px',
    fontSize: '40px',
  },
  promoPrice: {
    color: 'green',
  },
  originalPrice: {
    color: 'red',
    textDecoration: 'line-through',
  },
});

function ProductCard({ data, getlengthShop }) {
  const [check, setChek] = useState();
  const [openAddProductModal, setOpenAddProductModal] = useState(false);
  const [user, setUser] = useState([]);

  const getProductsCard = () => {
    axios
      .get('https://www.electrozayn.com/api/get_all_shopcard/card')
      .then((res) => {
        const product = res.data.find((product) => product.products_id === data.id);
        if (product) {
          setChek(product.check_add_or_not);
        }
        localStorage.setItem('shop', res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const user_id = localStorage.getItem('id');
    axios.get('https://www.electrozayn.com/api/user/getone/' + user_id).then((res) => {
      setUser(res.data);
    });
setChek(check)   
 getlengthShop();
  }, [check]);

  const deleteProduct = (id) => {
    axios.delete('https://www.electrozayn.com/api/delete/product/' + id).then((res) => {
      if (res.data === 'product deleted') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your product deleted !',
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    });
  };

  const AddTocard = (data) => {
    
    const user_id = localStorage.getItem('id');
    const updatedCheck = !check; // Invert the value of `check`
    if (updatedCheck === true) {
      axios
        .post(`https://www.electrozayn.com/api/product/add_to_shop_card/${user_id}`, {
          check_add_or_not: updatedCheck, // Use the updated value of `check`
          products_id: data.id,
        })
        .then((res) => {
          setChek(updatedCheck); // Update the state with the updated value
          getlengthShop();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .put(`https://www.electrozayn.com/api/update/shop_card/${data.id}`)
        .then((res) => {
          setChek(updatedCheck); // Update the state with the updated value
          getlengthShop();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const classes = useStyles();

  useEffect(() => {
    getProductsCard(); // Call the function when navigating to the component
  }, []);
  
  return (
    <>
     <Card className={classes.root}>
        <CardActionArea>
          <CardMedia className={classes.media} image={data.product_image} title={data.product_name} />
          <CardContent style={{height: "260px", width: "100%"}}>
            <Typography gutterBottom variant="h6" component="h1">
              {data.product_name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {data.description}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {data.Promo_price <= 0 ? <span className={classes.promoPrice}> Price: {data.Origin_price} TND</span>
              :<span className={classes.originalPrice}> Original Price: {data.Origin_price} TND</span>}
            </Typography>
            {user.map((el) => {
              return (
                <>
                  {el.role === 'admin' ? (
                    <Typography variant="body2" color="textSecondary" component="p">
                      Quantity: {data.quantity}
                    </Typography>
                  ) : null}
                </>
              );
            })}

            {data.Promo_price>0 ?
              <Typography variant="body2" color="textSecondary" component="p">
                <span className={classes.promoPrice}>Promo Price: {data.Promo_price} TND</span>
              </Typography>
            :null}
            <Typography variant="body2" color="textSecondary" component="p">
              Reference: {data.reference}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Availability: {data.quantity > 3 ? <span style={{color:"green",fontSize:"16px"}}>En Stock</span> :(data.quantity<5 ?<span style={{color:"blue",fontSize:"16px"}} >En Arrivage</span>:<span  style={{color:"red",fontSize:"16px"}}>Sur Comande</span>)}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Category: {data.catigory}
            </Typography>
          </CardContent>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'relative' }}>
            {user.map((el) => {
              return (
                <>
                  {el.role === 'admin' ? (
                    <Button onClick={() => setOpenAddProductModal(true)}>Update</Button>
                  ) : null}
                  {el.role === 'admin' ? (
                    <Button onClick={() => deleteProduct(data.id)} style={{ backgroundColor: "red" }}>Delete</Button>
                  ) : null}
                </>
              );
            })}
          </div>
       <div style={{ display: 'flex', justifyContent: 'flex-end', color:check === 1 ?"green":"black"}}  >

<FaShoppingCart className={classes.shopIcon} onClick={() => AddTocard(data)} />
</div>

        </CardActionArea>

      </Card>
      <AddProductModal
        open={openAddProductModal}
        handleClose={() => setOpenAddProductModal(false)}
        product={data}
        id={data.id}
      />
   
    </>
  );
}

export default ProductCard;

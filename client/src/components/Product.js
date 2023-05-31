import React, { useEffect, useState } from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { Button } from 'react-bootstrap';
import AddProductModal from './UpdateModal';
import axios from 'axios';
import { FaShoppingCart } from 'react-icons/fa';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    flex: '0 0 calc(33.33% - 1rem)',
    marginBottom: '1rem',
    marginRight: '1rem',
    display: 'inline-block',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    position: 'relative',
  },
  media: {
    height: 200,
    width: '100%',
    objectFit: 'cover',
    backgroundImage: 'none',
  },
  shopIcon: {
    position: 'absolute',
    top: '0.5rem',
    left: '0.5rem',
    fontSize: '1.5rem',
  },
  promoPrice: {
    color: 'green',
  },
  originalPrice: {
    color: 'red',
    textDecoration: 'line-through',
  },
  image: {
    width: 345,
    height: 200
  }

});

function ProductCard({ data }) {
  const [openAddProductModal, setOpenAddProductModal] = useState(false);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const user_id = localStorage.getItem('id');
    axios.get('https://www.electrozayn.com/api/user/getone/' + user_id).then((res) => {
      setUser(res.data);
    });
  }, []);

  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia className={classes.media} image={data.product_image} title={data.product_name} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {data.product_name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {data.description}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <span className={classes.originalPrice}>Original Price: {data.Origin_price} TND</span>
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

            {data.Promo_price && (
              <Typography variant="body2" color="textSecondary" component="p">
                <span className={classes.promoPrice}>Promo Price: {data.Promo_price} TND</span>
              </Typography>
            )}
            <Typography variant="body2" color="textSecondary" component="p">
              Reference: {data.reference}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Availability: {data.availibility}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Category: {data.catigory}
            </Typography>
          </CardContent>
          <div style={{ display: 'flex', justifyContent: 'flex-end'}}>

            <FaShoppingCart className={classes.shopIcon} onClick={() => console.log('hello')} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'relative' }}>
            {user.map((el) => {
              return (
                <>
                  {el.role === 'admin' ? (
                    <Button onClick={() => setOpenAddProductModal(true)}>Update</Button>
                  ) : null}
                  {el.role === 'admin' ? (
                    <Button onClick={() => setOpenAddProductModal(true)} style={{ backgroundColor: "red" }}>Delete</Button>
                  ) : null}
                </>
              );
            })}
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

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
  },
  media: {
    height: 140,
  },
  promoPrice: {
    color: 'green',
  },
  originalPrice: {
    color: 'red',
    textDecoration: 'line-through',
  },
  shopIcon: {
    float: 'right',
    marginTop: '-1rem',
    marginRight: '-1rem',
  },
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
          <Typography variant="body2" color="textSecondary" component="p">
            Quantity: {data.quantity}
          </Typography>
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
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {user.map((el) => {
            return (
              <>
                {el.role === 'admin' ? (
                  <Button onClick={() => setOpenAddProductModal(true)}>Update</Button>
                ) : null}
              </>
            );
          })}
        </div>
        <div className={classes.shopIcon} onClick={console.log('hello'+1)}>
          <FaShoppingCart />
        </div>
      </CardActionArea>
      <AddProductModal
        open={openAddProductModal}
        handleClose={() => setOpenAddProductModal(false)}
        product={data}
        id={data.id}
      />
    </Card>
  );
}

export default ProductCard;

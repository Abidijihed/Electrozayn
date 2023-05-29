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

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

function ProductCard({data}) {
  const [openAddProductModal, setOpenAddProductModal] = useState(false);
  const [user,setUser]=useState([])
    const handleAddProduct = (product) => {
      // Handle adding the product here
      console.log(product);
    };

    useEffect(() => {
      const user_id = localStorage.getItem("id");
      axios.get("https://www.electrozayn.com/api/user/getone/"+ user_id)
        .then((res) => {
         
          setUser(res.data);
        });
    }, []);
  const classes = useStyles();

 

  return (
    <Card className={classes.root}>
        
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={data.product_image}
          title={data.product_name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {data.product_name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {data.description}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Original Price: ${data.Origin_price}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Quantity: {data.quantity}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Promo Price: ${data.Promo_price?data.Promo_price:null}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Reference: {data.reference}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Availability: {data.availibility ? 'In Stock' : 'Out of Stock'}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Category: {data.catigory}
          </Typography>
        </CardContent>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {user.map((el)=>{
            return(
             <>
            {el.role === "admin" ?<button onClick={() => setOpenAddProductModal(true)}>update</button>:null}
             </>
            )
        })}
      
      <AddProductModal
        open={openAddProductModal}
        handleClose={() => setOpenAddProductModal(false)}
        handleAddProduct={handleAddProduct}
        id={data.id}
      />

    </div>
      </CardActionArea>
    </Card>
  );
}

export default ProductCard;

import React from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

function ProductCard({data}) {
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
      </CardActionArea>
    </Card>
  );
}

export default ProductCard;

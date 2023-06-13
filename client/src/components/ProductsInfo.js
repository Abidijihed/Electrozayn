import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, IconButton, Input, makeStyles } from '@material-ui/core';
import { Add, ZoomIn } from '@material-ui/icons';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    },
    card: {
      width: 800,
      padding: theme.spacing(4),
      display: 'flex',
      flexDirection: 'row',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
      },
    },
    thumbnailContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      marginRight: theme.spacing(4),
    },
    thumbnail: {
      width: 60,
      height: 60,
      objectFit: 'cover',
      marginBottom: theme.spacing(1),
      cursor: 'pointer',
      transition: 'transform 0.3s',
      '&:hover': {
        transform: 'scale(1.1)',
      },
    },
    infoContainer: {
      display: 'flex',
      flexDirection: 'row',
      flex: 1,
      [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(4),
        alignItems: 'center',
        display: 'flex',
      flexDirection: 'column',
      },
    },
    imageContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: theme.spacing(2),
      flex: 1,
    },
    image: {
      width: '300px',
      height: '400px',
      transition: 'transform 0.3s',
      '&:hover': {
        transform: 'scale(1.2)',
      },
    },
    addImageContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: theme.spacing(2),
    },
    addImageButton: {
      marginLeft: theme.spacing(1),
    },
    reference: {
      fontSize: '24px',
      color: 'blue',
    },
    promoPrice: {
      color: 'green',
    },
    originalPrice: {
      color: 'red',
      textDecoration: 'line-through',
    },
  }));
const ProductInfo = () => {
  const classes = useStyles();
  const [selectedImage, setSelectedImage] = useState('');
  const [zoomed, setZoomed] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [role, setRole] = useState('');
  const [oneProduct, setProduct] = useState(null);
  const [productImage, setProductImage] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const user_id = localStorage.getItem('id');
    axios.get('https://www.electrozayn.com/api/user/getone/' + user_id).then((res) => {
      res.data.map((el) => {
        setRole(el.role);
      });
    });
  }, []);

  useEffect(() => {
    axios.get(`https://www.electrozayn.com/api/get_one_product/${id}`).then((res) => {
      setProduct(res.data);
      setSelectedImage(res.data[0].product_image);
    });
  }, [id]);

  const handleThumbnailClick = (imagePath) => {
    setSelectedImage(imagePath);
  };

  const handleImageZoom = () => {
    setZoomed(!zoomed);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddImage = async () => {
    const formData = new FormData();
    formData.append('file', productImage);
    formData.append('upload_preset', 'ml_default');
    if (productImage.name) {
      await axios
        .post('https://api.cloudinary.com/v1_1/dycjej355/upload', formData)
        .then((res) => {
          axios
            .post(`https://www.electrozayn.com/api/add_thumbnailes/images/${id}`, {
              product_image: res.data.url,
            })
            .then((res) => {
              console.log(res.data);
            });
        });
    }
    setInputValue('');
  };

  return (
    <div className={classes.root} id="productinfo">
      <div className={classes.thumbnailContainer}>
        <img
          src="https://i.pinimg.com/564x/9f/36/88/9f3688e2d2c869751d39777d424025b9.jpg"
          alt="Thumbnail 1"
          className={classes.thumbnail}
          onClick={() =>
            handleThumbnailClick(
              'https://i.pinimg.com/564x/9f/36/88/9f3688e2d2c869751d39777d424025b9.jpg'
            )
          }
        />
        <img
          src="https://i.pinimg.com/564x/69/03/7e/69037e7647911adf5446c07ec4af44c9.jpg"
          alt="Thumbnail 2"
          className={classes.thumbnail}
          onClick={() =>
            handleThumbnailClick(
              'https://i.pinimg.com/564x/69/03/7e/69037e7647911adf5446c07ec4af44c9.jpg'
            )
          }
        />
      </div>
      <Card className={classes.card}>
        <div className={classes.infoContainer}>
            {console.log(selectedImage)}
          <div className={classes.imageContainer}>
            <img
              src={selectedImage}
              alt="Product"
              className={`${classes.image} ${zoomed && classes.zoomed}`}
              onClick={handleImageZoom}
            />
          </div>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Product Info
            </Typography>
            <Typography variant="body1" gutterBottom>
              {oneProduct?.product_name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {oneProduct?.description}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {oneProduct?.Promo_price <= 0 ? (
                <span className={classes.promoPrice}>
                  Price: {oneProduct?.Origin_price} TND
                </span>
              ) : (
                <span className={classes.originalPrice}>
                  Original Price: {oneProduct?.Origin_price} TND
                </span>
              )}
            </Typography>
            <Typography variant="body2" gutterBottom className={classes.reference}>
              <span style={{ fontWeight: 'bold' }}>Reference:</span> {oneProduct?.reference}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <span style={{ fontWeight: 'bold' }}>Availability:</span>{' '}
              <span style={{ color: 'green', fontSize: '16px' }}>
                {oneProduct?.quantity > 3 ? 'En Stock' : 'En Arrivage'}
              </span>
            </Typography>
            <Typography variant="body2" gutterBottom>
              <span style={{ fontWeight: 'bold' }}>Category:</span>
              {oneProduct?.catigory}
            </Typography>
          </CardContent>
        </div>
      </Card>
      {role !== 'admin' && (
        <div className={classes.addImageContainer}>
          <Input
            type="file"
            placeholder="Add image URL"
            value={inputValue}
            onChange={(e) => setProductImage(e.target.files[0])}
            disableUnderline
            fullWidth
          />
          <IconButton
            color="primary"
            aria-label="Add Image"
            className={classes.addImageButton}
            onClick={handleAddImage}
          >
            <Add />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default ProductInfo;

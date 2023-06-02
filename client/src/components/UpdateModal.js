import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Modal,
  TextField,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import Swal from 'sweetalert2'

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
  },
  input: {
    margin: theme.spacing(1),
  },
  button: {
    color:"blue",
    marginTop: theme.spacing(10),
  },
}));

function AddProductModal({ open, handleClose, handleAddProduct,id,product }) {
  const classes = useStyles();
  const [productName, setProductName] = useState(product.product_name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.Origin_price);
  const [quantity, setQuantity] = useState(product.quantity);
  const [oldPrice, setOldPrice] = useState(product.Promo_price);
  const [reference, setReference] = useState(product.reference);
  const [productImage, setProductImage] = useState([]);
  const [availability, setAvailability] = useState(product.availibility);
  const [catigory,setCatigory]=useState(product.catigory)
  const handleSubmit = async(event) => {
    // event.preventDefault();
    const formData = new FormData();
    formData.append("file", productImage);
    formData.append("upload_preset", "ml_default");
    console.log(productImage)
    if(productImage){
   await axios.post("https://api.cloudinary.com/v1_1/dycjej355/upload", formData)

    .then((res)=>{
      console.log(res.data.url)
        axios.put('https://www.electrozayn.com/api/update/product/'+id,{
            product_name:productName,
            description:description,
            Origin_price:price,
            quantity:quantity,
            Promo_price:oldPrice,
            reference:reference,
            product_image:res.data.url,
            availibility:availability,
            catigory:catigory
        }).then((res)=>{
          console.log(res.data.url)
          if(res.data==="product updated"){
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Your work has been saved',
              showConfirmButton: false,
              timer: 1500
            })
            setTimeout(() => {
              // window.location.reload()
            }, 1500);
            
          }
        })
        
    })
}else if(!productImage){
    axios.put('https://www.electrozayn.com/api/update/product/'+id,{
        product_name:productName,
        description:description,
        Origin_price:price,
        quantity:quantity,
        Promo_price:oldPrice,
        reference:reference,
        product_image:product.product_image,
        availibility:availability,
        catigory:catigory
    }).then((res)=>{
      if(res.data==="product updated"){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(() => {
          // window.location.reload()
        }, 1500);
        
      }
    })
    

}
  
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className={classes.paper}>
        <Typography variant="h6" gutterBottom>
          Add Product
        </Typography>
       
          <TextField
            className={classes.input}
            required
            label="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <TextField
            className={classes.input}
            required
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            className={classes.input}
            required
            label="Origin Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            className={classes.input}
            required
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <TextField
            className={classes.input}
            label="Promo price"
            type="number"
            value={oldPrice}
            onChange={(e) => setOldPrice(e.target.value)}
          />
          <TextField
            className={classes.input}
            required
            label="Reference"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
          />
          <TextField
          type='file'
            className={classes.input}
            required
            // label="Product Image"
            // value={productImage}
            onChange={(e) => setProductImage(e.target.files[0])}
          />
          <TextField
            className={classes.input}
            required
            label="Availability"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
          />
            <TextField
            className={classes.input}
            required
            label="Catigory"
            value={catigory}
            onChange={(e) => setCatigory(e.target.value)}
          />
          <Button
          onClick={()=>handleSubmit()}
            className={classes.button}
            variant="contained"
            color="primary"
            type="submit"
          >
            Update
          </Button>
      
      </div>
    </Modal>
  );
}

export default AddProductModal;

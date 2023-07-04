import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";
import { Button, Modal, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import Swal from "sweetalert2";
import PhoneInput from "react-phone-input-2";
import { ToastContainer, toast } from "react-toastify";


const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    outline: "none",
  },
  input: {
    margin: theme.spacing(1),
  },
  button: {
    color: "white",
    marginTop: theme.spacing(10),
  },
}));

function CheckoutValidation({user, open, handleClose, totalPrice,handleValidation,products }) {
  const classes = useStyles();
  const [FirstName, setFirstName] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [Zip, setZip] = useState("");
  const [Email, setEmail] = useState("");
  const [PhoneNumber, setPhone] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [ZipError, setZipError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    var quantity=0
    var productname=""
    var id = localStorage.getItem("id");
    if (FirstName === "") {
      setFirstNameError(true);
    } else {
      setFirstNameError(false);
    }
    if (!/\S+@\S+\.\S+/.test(Email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    if (!PhoneNumber) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }
    if (address === "") {
      setAddressError(true);
    } else {
      setAddressError(false);
    }
    if (country === "") {
      setCountryError(true);
    } else {
      setCountryError(false);
    }
    if (Zip === "") {
      setZipError(true);
    } else {
      setZipError(false);
    }

    if (
      FirstName &&
      /\S+@\S+\.\S+/.test(Email) &&
      address &&
      PhoneNumber &&
      country &&
      Zip
    ) {
        products.map((el)=>{
         quantity+=el.quantity
         productname+=el.product_name+" "
        })
      axios
        .post(`https://www.electrozayn.com/api/create/order/${id}`, {
          FirstName: FirstName,
          Email: Email,
          PhoneNumber: PhoneNumber,
          address: address,
          country: country,
          Zip: Zip,
          total_price:totalPrice,
          product_name:productname,
           product_quantity:quantity
        })
        .then((res) => {
            if(res.data === "user updated and order created"){
                handleValidation()
            axios.delete(`https://www.electrozayn.com/api/delete_shop_card/${id}`)
            .then((res)=>{
              if(res.data === "deleted"){
                  localStorage.removeItem("shop")
                  toast.success("Success Validation Order !", {
                    position: toast.POSITION.TOP_RIGHT,
                  })
                setTimeout(() => {
                  navigate("/profile")
                  window.location.reload()
                }, 2000);
              }
            })
            }
          
        });
    }
  };
useEffect(()=>{
  if(open){
    setFirstName(user?.FirstName)
    setEmail(user?.Email)
    setAddress(user?.Address)
    setCountry(user?.country)
    setZip(user?.Zip)
    setPhone(user?.PhoneNumber)
  }
},[open])
  return (
    <>
    <ToastContainer />
    <Modal open={open} onClose={handleClose}>
      <div className={classes.paper}>
        <Typography variant="h6" gutterBottom>
          Validate Order
        </Typography>
        <TextField
          className={classes.input}
          required
          label="FirstName"
          error={firstNameError}
          value={FirstName}

          onChange={(e) => setFirstName(e.target.value)}
        />
       
        <TextField
          className={classes.input}
          required
          error={emailError}
          type="email"
          label="Email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          className={classes.input}
          required
          error={countryError}
          label="Country"
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <TextField
          className={classes.input}
          required
          error={addressError}
          label="Street Address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          className={classes.input}
          label="Zip Code"
          value={Zip}
          error={ZipError}
          onChange={(e) => setZip(e.target.value)}
        />
        <PhoneInput
          country={"tn"}
          label="Phone Number"
          required
          error={phoneError}
          value={PhoneNumber}
          onChange={(PhoneNumber) => setPhone(PhoneNumber)}
        />
        <br></br>
        <Typography variant="body2" color="black" component="h3">
                Total: {totalPrice} {" "} TND
              </Typography>
              
        <Button
          onClick={() => handleSubmit()}
          className={classes.button}
          variant="contained"
          color="primary"
        >
          Validate
        </Button>
      </div>
    </Modal>
    </>
  );
}

export default CheckoutValidation;

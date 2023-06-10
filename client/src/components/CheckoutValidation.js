import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Modal, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import Swal from "sweetalert2";
import PhoneInput from "react-phone-input-2";

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
    color: "blue",
    marginTop: theme.spacing(10),
  },
}));

function CheckoutValidation({ open, handleClose, total }) {
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

  const handleSubmit = async (e) => {
    var user_id = localStorage.getItem("id");
    e.preventDefault();
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
      axios
        .post(`https://www.electrozayn.com/api/create/order/${user_id}`, {
          FirstName: FirstName,
          Email: Email,
          PhoneNumber: PhoneNumber,
          address: address,
          country: country,
          Zip: Zip,
        })
        .then((res) => {
          console.log(res.data);
        });
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className={classes.paper}>
        <Typography variant="h6" gutterBottom>
          Validate Order
        </Typography>
{console.log(total)}
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
        <Button
          onClick={() => handleSubmit()}
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
        >
          Validate
        </Button>
      </div>
    </Modal>
  );
}

export default CheckoutValidation;

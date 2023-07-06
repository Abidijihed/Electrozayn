import React, { useState } from "react";
import { Typography, makeStyles, TextField, Button } from "@material-ui/core";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
const token = localStorage.getItem("token");
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(10),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(3),
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function SignupPage() {
  const classes = useStyles();
  const [FirstName, setFirstName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [PhoneNumber, setPhone] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const navigate = useNavigate();
  const handleSignup = (e) => {
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
    if (Password.length < 8) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
    if (!PhoneNumber) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }
    if (
      FirstName &&
      /\S+@\S+\.\S+/.test(Email) &&
      Password.length >= 8 &&
      PhoneNumber
    ) {
      // handle signup logic
      axios
        .post("https://www.electrozayn.com/api/Create_user/electrozayn", {
          FirstName: FirstName,
          Email: Email,
          PhoneNumber: PhoneNumber,
          Password: Password,
        })
        .then((res) => {
          if (res.data[1] === "secsuss") {
            localStorage.setItem("token", res.data[0]);
            localStorage.setItem("id", res.data[2]);
            setTimeout(() => {
              navigate("/profile");
            }, 2000);
          } else if (res.data === "user exist") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong! USER Exists",
            });
          }
        });
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant="h3" align="center">
        Sign Up
      </Typography>
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={handleSignup}
      >
        <TextField
          label="First Name"
          required
          error={firstNameError}
          value={FirstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          label="Email"
          required
          error={emailError}
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          required
          error={passwordError}
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <PhoneInput
          country={"tn"}
          label="Phone Number"
          required
          error={phoneError}
          value={PhoneNumber}
          onChange={(PhoneNumber) => setPhone(PhoneNumber)}
        />
        <Button variant="contained" color="primary" type="submit">
          Sign Up
        </Button>
      </form>
      <p style={{ textAlign: "center", marginTop: "10px" }}>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}

export default SignupPage;

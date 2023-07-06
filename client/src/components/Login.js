import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  TextField,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import { Loginuser } from "../redux/action/userAction";
import { useDispatch } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
    margin: "0 auto",
    marginTop: theme.spacing(10),
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  title: {
    textAlign: "center",
    fontSize: "32px",
    fontWeight: "bold",
    margin: "10px 0",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(4),
  },
  textField: {
    width: "100%",
    marginBottom: theme.spacing(3),
  },
  button: {
    marginTop: theme.spacing(2),
    width: "50%",
  },
}));

function LoginPage() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelLoginUser = () => {
    axios
      .post("https://www.electrozayn.com/api/electrozayn/login", {
        Email: Email,
        Password: Password,
      })
      .then((res) => {
        if (res.data === "somthing went wrong") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong! Check your Email Or Password",
          });
        } else if (res.data[1] === "secsuss") {
          localStorage.setItem("token", res.data[0]);
          localStorage.setItem("id", res.data[2]);
          navigate("/profile");
        }
      });
  };
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<LockOutlinedIcon className={classes.avatar} />}
        title={<span className={classes.title}>Log in</span>}
      />
      <CardContent>
        <form className={classes.form} noValidate autoComplete="off">
          <TextField
            type="email"
            className={classes.textField}
            label="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            className={classes.textField}
            label="Password"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={() => handelLoginUser()}
          >
            Log in
          </Button>
        </form>
        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Don't have an account yet? <Link to="/signup">Sign up</Link>
        </p>
      </CardContent>
    </Card>
  );
}

export default LoginPage;

import axios from "axios";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

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
  section: {
    marginBottom: theme.spacing(3),
  },
  profileImage: {
    width: "150px",
    height: "150px",
    margin: "0 auto",
    marginBottom: theme.spacing(2),
    borderRadius: "50%",
    objectFit: "cover",
  },
  prettyButton: {
    background: "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
    border: 0,
    borderRadius: 10,
    color: "white",
    padding: "10px 20px",
    cursor: "pointer",
    boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
    transition: "transform 0.3s",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  prettyButton1: {
    background: "red",
    border: 0,
    borderRadius: 10,
    color: "white",
    padding: "10px 20px",
    cursor: "pointer",
    boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
    transition: "transform 0.3s",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
}));

function ProfilePage({user,role}) {
  const classes = useStyles();
  const [order, setOrder] = useState([]);
  

  setTimeout(() => {
    const user_id = localStorage.getItem("id");
    if (role === "admin") {
      axios.get(`https://www.electrozayn.com/api/get_all_order`).then((res) => {
        setOrder(res.data);
      });
    } else {
      axios
        .get(`https://www.electrozayn.com/api/get_user_order/${user_id}`)
        .then((res) => {
          setOrder(res.data);
        });
    }
  }, 500);

  const confirmOrder = (id) => {
    axios
      .put(`https://www.electrozayn.com/api/confirm/order/${id}`)
      .then((res) => {
        console.log(res.data);
        setOrder(order);
        toast.success("Success Order Confirmed !", {
          position: toast.POSITION.TOP_RIGHT,
        })
      }).catch((err)=>{
        console.log(err)
      })
  };
const logout=()=>{
  axios.get("https://www.electrozayn.com/api/logout")
  .then((res)=>{
if(res.data==="user loged out"){
  localStorage.clear()
  window.location.reload()

}
  })
}
const deleteOrder=(id)=>{
     axios.delete(`https://www.electrozayn.com/api/delete/${id}`)
     .then((res)=>{
      if(res.data==="order deleted"){
        toast.success("Success Order Deleted !", {
          position: toast.POSITION.TOP_RIGHT,
        })
         
      }
     })
}
  return (
    <>
    <ToastContainer />
      {/* First section */}
      {user.map((el) => (
        <Card className={classes.root} key={el.id}>
          <CardHeader
            avatar={
              <Avatar className={classes.avatar}>
                {/* <LockOutlinedIcon /> */}
              </Avatar>
            }
            title={
              <Typography variant="h4" className={classes.title}>
                Profile Information
              </Typography>
            }
          />
          <CardContent>
            <img
              src={
                el.profileImage ||
                "https://img.favpng.com/12/15/21/computer-icons-avatar-user-profile-recommender-system-png-favpng-HaMDUPFH1etkLCdiFjgTKHzAs.jpg"
              }
              alt="Profile"
              className={classes.profileImage}
            />

            <div className={classes.section}>
              <Typography variant="h6" gutterBottom>
                Email:
              </Typography>
              <Typography variant="body1">{el.Email}</Typography>
            </div>
            <Divider />
            <div className={classes.section}>
              <Typography variant="h6" gutterBottom>
                Phone Number:
              </Typography>
              <Typography variant="body1">{el.phoneNumber}</Typography>
            </div>
            <Divider />
            <div className={classes.section}>
              <Typography variant="h6" gutterBottom>
                First Name:
              </Typography>
              <Typography variant="body1">
                {el ? el.FirstName : null}
              </Typography>
            </div>
            <Divider />
            <div className={classes.section}>
              <Typography variant="h6" gutterBottom>
                Last Name:
              </Typography>
              <Typography variant="body1">
                {el ? el.LastName : null}
              </Typography>
            </div>
            <Divider />
            <div className={classes.section}>
              <Typography variant="h6" gutterBottom>
                Address:
              </Typography>
              <Typography variant="body1">
                {el ? el.Address : null}
              </Typography>
            </div>
            <Divider />
            <div className={classes.section}>
              <Typography variant="h6" gutterBottom>
                Code Zip:
              </Typography>
              <Typography variant="body1">{el ? el.Zip : null}</Typography>
            </div>
            <Divider />
            <div className={classes.section}>
              <Typography variant="h6" gutterBottom>
                Country:
              </Typography>
              <Typography variant="body1">
                {el ? el.country : null}
              </Typography>
            </div>
            <Divider />
          </CardContent>

          <Button style={{backgroundColor:"red"}} onClick={logout}>LogOut</Button>
        </Card>
      ))}

      {/* Second section */}
      <div>
      {order.map((el) => (
  <Card className={classes.root} key={el.id}>
    <CardContent>
      <h1
        style={{
          color: el.validate_add_or_not === 0 ? "red" : "green",
        }}
      >
        {el.validate_add_or_not === 0 ? "Waiting for Confirmation" : "Confirmed"}
      </h1>
      <h3>{el.product_name}</h3>
      <p>Email: {el.email}</p>
      <p>FirstName: {el.FirstName}</p>
      <p>PhoneNumber: {el.PhoneNumber}</p>
      <p>Zip: {el.Zip}</p>
      <p>Address: {el.address}</p>
      <p>Country: {el.country}</p>
      <p>Date: {el.date}</p>
      <p>Product Quantity: {el.product_quantity}</p>
      <p>Total Price: {el.total_price} TNDT</p>
     
      {role === "admin" && (
        <div style={{display:"flex",justifyContent:"space-around"}}>
          <Button
            className={classes.prettyButton}
            onClick={() => confirmOrder(el.id)}
            disabled={el.validate_add_or_not === 1}
          >
            Confirm
          </Button>
          {role === "admin" ?<Button className={classes.prettyButton1} onClick={() => deleteOrder(el.id)}>
            Delete
          </Button>:null}
        </div>
      )}
    </CardContent>
  </Card>
))}

      </div>
    </>
  );
}

export default ProfilePage;

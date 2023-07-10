import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from "react";
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

import { ToastContainer, toast } from "react-toastify";
import InfoAdmin from "./InfoAdmin";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
    margin: "0 auto",
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

function ProfilePage({ user, role }) {
  const classes = useStyles();
  const [order, setOrder] = useState([]);
      const [orderItems,setOrderItems]=useState([])
      const [data,setData]=useState([])
      useEffect(() => {
        axios.get("https://www.electrozayn.com/api/getAll/product").then((res) => {
          setData(res.data);
        });
      }, [data]);
  useEffect(() => {
   
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
  }, [order]);
useEffect(()=>{
  axios.get('https://www.electrozayn.com/api/order_items').then((res)=>{
    setOrderItems(res.data)
  })
},[orderItems])
  const confirmOrder = (id,userID) => {
    axios
      .put(`https://www.electrozayn.com/api/confirm/order/${id}`,{userID,orderItems,order})
      .then((res) => {
        setOrder(order);
        toast.success("Success Order Confirmed !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const logout = () => {
    axios.get("https://www.electrozayn.com/api/logout").then((res) => {
      if (res.data === "user loged out") {
        localStorage.clear();
        window.location.reload();
      }
    });
  };
  const deleteOrder = (id) => {
    axios.delete(`https://www.electrozayn.com/api/delete/${id}`).then((res) => {
      if (res.data === "order deleted") {
        toast.success("Success Order Deleted !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    });
  };
  return (
    <>
      <ToastContainer/>
      {/* First section */}
    
      <Container style={{marginTop:"15px",marginBottom:"20px",height: "100%"}}>
      <Row>
        <Col>
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
              <Typography variant="body1">{el ? el.LastName : null}</Typography>
            </div>
            <Divider />
            <div className={classes.section}>
              <Typography variant="h6" gutterBottom>
                Address:
              </Typography>
              <Typography variant="body1">{el ? el.Address : null}</Typography>
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
              <Typography variant="body1">{el ? el.country : null}</Typography>
            </div>
            <Divider />
          </CardContent>

          <Button style={{ backgroundColor: "red" }} onClick={logout}>
            LogOut
          </Button>
        </Card>
      ))}
        
        </Col>
       {role==="admin"? <Col>
       {data.filter((el)=>el.quantity<0).map((el)=><InfoAdmin product={el} key={el.id} /> ) }
        </Col>:null}
      </Row>
      </Container>

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
                {el.validate_add_or_not === 0
                  ? "Waiting for Confirmation"
                  : "Confirmed"}
              </h1>
              <h3>{el.product_name}</h3>
              <p>Email: {el.Email}</p>
              <p>FirstName: {el.FirstName}</p>
              <p>PhoneNumber: {el.PhoneNumber}</p>
              <p>Zip: {el.Zip}</p>
              <p>Address: {el.address}</p>
              <p>Country: {el.country}</p>
              <p>Date: {el.date}</p>
              <div>
              <table>
  <thead>
    <tr>
      <th>Product Name</th>
      <th>Quantity</th>
      <th>Price</th>
    </tr>
  </thead>
  <tbody>
    {orderItems
      .filter((item) => item.order_id === el.id)
      .map((items) => (
        <tr key={items.id}>
          <td>{items.product_name}</td>
          <td>{items.product_quantity}</td>
          <td>{items.product_price}</td>
        </tr>
      ))}
  </tbody>
  <tfoot>
    <tr className="total-row">
      <td colSpan="3" style={{ textAlign: "right" }}>
        Total Price:
      </td>
      <td>{el.total_price>100.00?el.total_price-7.00:el.total_price}{" "}TND</td>
    </tr>
  </tfoot>
</table>
              </div>
            

              {role === "admin" && (
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <Button
                    className={classes.prettyButton}
                    onClick={() => confirmOrder(el.id,el.user_id)}
                    disabled={el.validate_add_or_not === 1}
                  >
                    Confirm
                  </Button>
                  {role === "admin" ? (
                    <Button
                      className={classes.prettyButton1}
                      onClick={() => deleteOrder(el.id)}
                    >
                      Delete
                    </Button>
                  ) : null}
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

import React, { useEffect, useState } from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Button } from "react-bootstrap";
import UpdateModal from "./UpdateModal";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { useDispatch } from "react-redux";
import { add_tocard, delete_produit, register, remove_fromcard } from "../redux/action/Action";
import ContinuerorComander from "./ContinuerorComander";
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    flex: "0 0 calc(33.33% - 1rem)",
    marginTop: "50px",
    marginBottom: "1rem",
    marginRight: "1rem",
    marginLeft: "1rem",
    display: "inline-block",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
    position: "relative",
    width: "450px",
  },
  media: {
    height: 385,
    width: "100%",
    backgroundImage: "none",
  },
  shopIcon: {
    marginRight: "13px",
    fontSize: "33px",
  },
  promoPrice: {
    color: "green",
  },
  originalPrice: {
    color: "red",
    textDecoration: "line-through",
  },
});

function ProductCard({ data}) {
  const token = localStorage.getItem("token");
  const [check, setChek] = useState();
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [user, setUser] = useState([]);
  const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const getProductsCard = () => {
    axios
      .get("https://www.electrozayn.com/api/get_all_shopcard/card")
      .then((res) => {
        const product = res.data.find(
          (product) => product.products_id === data.id
        );
        if (product) {
          setChek(product.check_add_or_not);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const user_id = localStorage.getItem("id");
    axios
      .get("https://www.electrozayn.com/api/user/getone/" + user_id)
      .then((res) => {
        setUser(res.data);
      });
    setChek(check);
    getProductsCard()
  }, [check]);

  const deleteProduct = (id) => {
    dispatch(delete_produit(id),Swal.fire({
      position: "center",
      icon: "success",
      title: "Your product deleted !",
      showConfirmButton: false,
      timer: 1500,
    }))
    
  };

  const AddTocard = (data) => {
    if (token) {
      const id = localStorage.getItem('id');
      const updatedCheck = !check; // Invert the value of `check`
      if (updatedCheck === true) {
        dispatch(add_tocard(id, { check_add_or_not: updatedCheck, products_id: data.id }), getProductsCard(),handleShow(data.id));
      } else {
        dispatch(remove_fromcard(data.id), getProductsCard());
      }
    } else {
      const userEmail = prompt("Email:"); // Prompt for email and store the value
      if (userEmail !== null) { // Check if the user entered an email (not canceled)
        axios
        .post("https://www.electrozayn.com/api/Create_user/electrozayn", {
          Email: userEmail,
          Password: "newuser",
        })
        .then((res) => {
          if (res.data[1] === "secsuss") {
            localStorage.setItem("token", res.data[0]);
            localStorage.setItem("id", res.data[2]);
          } else if (res.data === "user exist") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong! USER Exists",
            });
          }
        });
      } else {
        // Handle the case when the user canceled the prompt or entered nothing
        console.log("User canceled the email prompt or entered nothing.");
      }
    }
  };
  

  const classes = useStyles();


  const handelNavigate = () => {
    navigate(`/productinfo/${data.id}`);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };
  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            onClick={() => handelNavigate()}
            className={classes.media}
            image={data.product_image}
            title={data.product_name}
            alt={data.product_name}
          />
          <CardContent style={{ height: "auto", width: "100%" }}>
            <Typography gutterBottom variant="h6" component="h1">
              {data.product_name}
            </Typography>
            {/* <Typography variant="body2" color="textSecondary" component="p">
              {data.description}
            </Typography> */}
            <Typography variant="body2" color="textSecondary" component="p">
              {data.Promo_price <= 0 ? (
                <span className={classes.promoPrice}>
                  {" "}
                  Price: {data.Origin_price} TND
                </span>
              ) : (
                <span className={classes.originalPrice}>
                  {" "}
                  Original Price: {data.Origin_price} TND
                </span>
              )}
            </Typography>
            {user.map((el) => {
              return (
                <>
                  {el.role === "admin" ? (
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      stockQuantity: {data.stockquantity}
                    </Typography>
                  ) : null}
                </>
              );
            })}

            {data.Promo_price > 0 ? (
              <Typography variant="body2" color="textSecondary" component="p">
                <span className={classes.promoPrice}>
                  Promo Price: {data.Promo_price} TND
                </span>
              </Typography>
            ) : null}
            <Typography variant="body2" color="textSecondary" component="p">
              Reference: {data.reference}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Availability:{" "}
              {data.stockquantity > 3 ? (
                <span style={{ color: "green", fontSize: "16px" }}>
                  En Stock
                </span>
              ) : data.stockquantity < 5 ? (
                <span style={{ color: "blue", fontSize: "16px" }}>
                  En Arrivage
                </span>
              ) : (
                <span style={{ color: "red", fontSize: "16px" }}>
                  Sur Comande
                </span>
              )}
            </Typography>
            {/* <Typography variant="body2" color="textSecondary" component="p">
              Category: {data.catigory}
            </Typography> */}
          </CardContent>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              position: "relative",
            }}
          >
            {user.map((el) => {
              return (
                <>
                  {el.role === "admin" ? (
                    <Button onClick={() => setOpenUpdateModal(true)}>
                      Update
                    </Button>
                  ) : null}
                  {el.role === "admin" ? (
                    <Button
                      onClick={() => deleteProduct(data.id)}
                      style={{ backgroundColor: "red" }}
                    >
                      Delete
                    </Button>
                  ) : null}
                </>
              );
            })}
          </div>
          <Button
            style={{
              backgroundColor: "#e8b623",
              border: "none",
              display: "flex",
              alignItems: "center",
             marginBottom: "11px",
              marginLeft: "20%"
            }}
            onClick={()=>AddTocard(data)}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                color: check === 1 ? "green" : "white",
              }}
            >
              <MdOutlineAddShoppingCart
                className={classes.shopIcon}
              
              />
            </div>
            
            {check === 0 ? "Ajouter au panier":"Produit Ajouter"}
          </Button>
        </CardActionArea>
      </Card>
      <UpdateModal
        open={openUpdateModal}
        handleClose={() => setOpenUpdateModal(false)}
        product={data}
        id={data.id}
      />
      <ContinuerorComander
      show={show}
      handleClose={handleClose}
      id={data.id}
      />
    </>
  );
}

export default ProductCard;

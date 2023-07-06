import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";

import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Input,
  makeStyles,
  Button,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ListProducts from "./Product";
import { MdOutlineAddShoppingCart } from "react-icons/md";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "auto",
    flexDirection: "column", // Update to column layout
  },
  card: {
    width: "90%", // Update to a percentage value
    maxWidth: 800, // Set a max width
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  thumbnailContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginRight: theme.spacing(4),
    marginTop: theme.spacing(2), // Add margin to separate from the card
    [theme.breakpoints.down("sm")]: {
      flexDirection: "row", // Change to row layout for mobile
      marginTop: 0,
    },
  },
  thumbnail: {
    width: 80,
    height: 80,
    margin: "10px",
    objectFit: "cover",
    marginBottom: theme.spacing(1),
    cursor: "pointer",
    transition: "transform 0.3s",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(4),
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
    },
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      flexBasis: "100%",
    },
  },

  image: {
    width: "100%", // Change to 100% to fill the container
    height: "auto", // Auto height for responsiveness
    transition: "transform 0.3s",
    "&:hover": {
      transform: "scale(1.2)",
    },
  },
  addImageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(2),
  },
  addImageButton: {
    marginLeft: theme.spacing(1),
  },
  reference: {
    fontSize: "24px",
    color: "blue",
  },
  promoPrice: {
    color: "green",
  },
  originalPrice: {
    color: "red",
    textDecoration: "line-through",
  },
  thumbnailWrapper: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(2),
    flexWrap: "wrap", // Allow thumbnails to wrap to the next line
  },
}));

const ProductInfo = ({ search, getlengthShop }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState("");
  const [zoomed, setZoomed] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [role, setRole] = useState("");
  const [oneProduct, setProduct] = useState(null);
  const [productImage, setProductImage] = useState([]);
  const [images, setImages] = useState([]);
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [check, setChek] = useState();
  const token = localStorage.getItem("token");
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
        localStorage.setItem("shop", res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const AddTocard = () => {
    const user_id = localStorage.getItem("id");
    const updatedCheck = !check; // Invert the value of `check`
    if (updatedCheck === true) {
      axios
        .post(
          `https://www.electrozayn.com/api/product/add_to_shop_card/${user_id}`,
          {
            check_add_or_not: updatedCheck, // Use the updated value of `check`
            products_id: id,
          }
        )
        .then((res) => {
          setChek(updatedCheck); // Update the state with the updated value
          getProductsCard();
          getlengthShop();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .put(`https://www.electrozayn.com/api/update/shop_card/${id}`)
        .then((res) => {
          setChek(updatedCheck); // Update the state with the updated value
          getProductsCard();
          getlengthShop();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    getProductsCard(); // Call the function when navigating to the component
  }, [check]);
  useEffect(() => {
    axios.get("https://www.electrozayn.com/api/getAll/product").then((res) => {
      setData(res.data);
    });
  }, []);
  const getRole = () => {
    const user_id = localStorage.getItem("id");
    axios
      .get("https://www.electrozayn.com/api/user/getone/" + user_id)
      .then((res) => {
        res.data.map((el) => {
          setRole(el.role);
        });
      });
  };
  setTimeout(() => {
    getRole();
  }, 1000);
  const getImages = () => {
    axios
      .get(`https://www.electrozayn.com/api/get_all_images/${id}`)
      .then((res) => {
        setImages(res.data);
      });
  };
  useEffect(() => {
    axios
      .get(`https://www.electrozayn.com/api/get_one_product/${id}`)
      .then((res) => {
        setProduct(res.data[0]);
        setSelectedImage(res.data[0].product_image);
      });
    getImages();
  }, []);

  useEffect(() => {
    const scrollToTop = () => {
      const element = document.getElementById("productinfo");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };

    scrollToTop();
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
    formData.append("file", productImage);
    formData.append("upload_preset", "ml_default");
    if (productImage.name) {
      await axios
        .post("https://api.cloudinary.com/v1_1/dycjej355/upload", formData)
        .then((res) => {
          axios
            .post(
              `https://www.electrozayn.com/api/add_thumbnailes/images/${id}`,
              {
                product_image: res.data.url,
              }
            )
            .then((res) => {
              if (res.data === "Image added") {
                setInputValue("");
                window.location.reload();
              }
            });
        });
    }
  };
  const deleteimages = (id) => {
    axios
      .delete("https://www.electrozayn.com/api/delete_images/" + id)
      .then((res) => {
        if (res.data === "image deleted") {
          getImages();
        }
      });
  };
  return (
    <div>
      {search.length > 0 ? (
        <div>
          {" "}
          {data
            .filter(
              (el) =>
                el.catigory?.toLowerCase().includes(search.toLowerCase()) ||
                el.reference?.toLowerCase().includes(search.toLowerCase()) ||
                el.product_name?.toLowerCase().includes(search.toLowerCase())
            )
            .map((el) => (
              <ListProducts
                data={el}
                key={el.id}
                getlengthShop={getlengthShop}
              />
            ))}
        </div>
      ) : (
        <div className={classes.root} id="productinfo">
          <Card className={classes.card}>
            <div className={classes.infoContainer}>
              <div className={classes.imageContainer}>
                {images.length > 0 ? (
                  <Carousel>
                    {images.map((el) => (
                      <Carousel.Item>
                        <>
                          <img
                            key={el.id}
                            src={el.product_image}
                            alt="Product"
                            // className="d-block w-100"
                            className={`${classes.image} ${
                              zoomed && classes.zoomed
                            }`}
                            onClick={handleImageZoom}
                          />
                        </>
                      </Carousel.Item>
                    ))}
                  </Carousel>
                ) : (
                  <img
                    src={selectedImage}
                    alt="Product"
                    className={`${classes.image} ${zoomed && classes.zoomed}`}
                    onClick={handleImageZoom}
                  />
                )}
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
                  {oneProduct?.Promo_price > 0 ? (
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      <span className={classes.promoPrice}>
                        Promo Price: {oneProduct?.Promo_price} TND
                      </span>
                    </Typography>
                  ) : null}
                </Typography>
                <Typography
                  variant="body2"
                  gutterBottom
                  className={classes.reference}
                >
                  <span style={{ fontWeight: "bold" }}>Reference:</span>{" "}
                  {oneProduct?.reference}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <span style={{ fontWeight: "bold" }}>Availability:</span>{" "}
                  <span style={{ color: "green", fontSize: "16px" }}>
                    {oneProduct?.quantity > 3 ? "En Stock" : "En Arrivage"}
                  </span>
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <span style={{ fontWeight: "bold" }}>Category:</span>
                  {oneProduct?.catigory}
                </Typography>
              </CardContent>
              <Button
                onClick={token ? () => AddTocard() : () => navigate("/login")}
                style={{
                  borderRadius: "50%",
                  padding: "10px",
                  fontSize: "30px",
                  marginTop: "10px",
                }}
              >
                <MdOutlineAddShoppingCart
                  style={{ color: check === 1 ? "green" : "black" }}
                />
              </Button>
            </div>
          </Card>
          <div className={classes.thumbnailContainer}>
            {images.map((el) => (
              <>
                <img
                  key={el.id}
                  src={el.product_image}
                  alt="Thumbnail"
                  className={classes.thumbnail}
                  onClick={() => handleThumbnailClick(el.product_image)}
                />
                {role === "admin" && (
                  <Button onClick={() => deleteimages(el.id)}>delete</Button>
                )}
              </>
            ))}
          </div>
          {role === "admin" && (
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
      )}
    </div>
  );
};

export default ProductInfo;

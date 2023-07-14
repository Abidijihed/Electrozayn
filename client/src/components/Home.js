import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@mui/material/Divider";
import Button from "@material-ui/core/Button";
import { Carousel, Card, Nav, Dropdown } from "react-bootstrap";
import ListProducts from "./Product";
import axios from "axios";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { differenceInDays, parse } from "date-fns";
import { useNavigate } from "react-router-dom";
import Typical from "react-typical";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "30px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  searchButton: {
    marginLeft: theme.spacing(2),
  },
  comingSoonWrapper: {
    // backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "calc(100vh - 64px)", // minus the height of the navbar
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  comingSoonContent: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    textAlign: "center",
  },
  promoPrice: {
    color: "green",
  },
  originalPrice: {
    color: "red",
    textDecoration: "line-through",
  },
}));

function HomePage({ search, getlengthShop }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const classes = useStyles();
  const [index, setIndex] = useState(0);
  const [displayCount, setDisplayCount] = useState(5);
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
  const AddTocard = (id) => {
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

  const handleShowMore = () => {
    setDisplayCount(displayCount + 5);
  };
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  useEffect(() => {
    axios.get("https://www.electrozayn.com/api/getAll/product").then((res) => {
      setData(res.data);
    });
  }, []);

  // ...

  const currentDate = new Date();

  // Filter data based on created_at date
  const filteredData = data.filter((el) => {
    const createdAtDate = new Date(el.created_at);
    const daysDifference = differenceInDays(currentDate, createdAtDate);
    return daysDifference < 10;
  });
  return (
    <>
      <a href="https://www.electrozayn.com/productCategory/TELECOMONDE%20CLIMATISEURS">
        <img
          id="imagegif"
          src="https://media.mytek.tn/media/wysiwyg/banner/header-top-generic-1366-65px-climatiseur-pourcentage-20.gif"
        />
      </a>

      {search.length > 0 ? (
        <div>
          {" "}
          {data
            .filter(
              (el) =>
                el.catigory.toLowerCase().includes(search.toLowerCase()) ||
                el.reference.toLowerCase().includes(search.toLowerCase()) ||
                el.product_name.toLowerCase().includes(search.toLowerCase())
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
        <div className={classes.root}>
          <div style={{ justifyContent: "center", display: "flex" }}>
            <Carousel
              activeIndex={index}
              onSelect={handleSelect}
              className="mycarousel"
            >
              <Carousel.Item>
                <img
                  style={{ height: "387px" }}
                  className="d-block w-100"
                  src="http://res.cloudinary.com/dycjej355/image/upload/v1687544230/IMG_0129_claxix.jpg"
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  style={{ height: "387px" }}
                  className="d-block w-100"
                  src="http://res.cloudinary.com/dycjej355/image/upload/v1688657476/IMG_0653_vyxyhc.jpg"
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  style={{ height: "387px" }}
                  className="d-block w-100"
                  src="http://res.cloudinary.com/dycjej355/image/upload/v1688150978/IMG_0351_jtvtgi.jpg"
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>
          </div>

          {/* div of the categories */}

          <div style={{ width: "100%", marginTop: "1%" }}>
            <Card>
              <Card.Header>
                <Nav variant="pills">
                  <Nav.Item
                    onClick={() =>
                      navigate(
                        `/productCategory/${encodeURIComponent("led tv")}`
                      )
                    }
                  >
                    <Nav.Link style={{ color: "black" }}>Led TV</Nav.Link>
                  </Nav.Item>
                  <Nav.Item
                    onClick={() =>
                      navigate(
                        `/productCategory/${encodeURIComponent(
                          "ADAPTATEUR ET ALIMETATION"
                        )}`
                      )
                    }
                  >
                    <Nav.Link style={{ color: "black" }}>Adptateur</Nav.Link>
                  </Nav.Item>
                  <Nav.Item
                    onClick={() =>
                      navigate(
                        `/productCategory/${encodeURIComponent("CHARGEURS")}`
                      )
                    }
                  >
                    <Nav.Link style={{ color: "black" }}>Chargeur</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="link"
                        id="dropdown-basic"
                        style={{ color: "black" }}
                      >
                        Commande
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() =>
                            navigate(
                              `/productCategory/${encodeURIComponent(
                                "TELECOMONDE TV"
                              )}`
                            )
                          }
                        >
                          TV
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            navigate(
                              `/productCategory/${encodeURIComponent(
                                "TELECOMONDE CLIMATISEURS"
                              )}`
                            )
                          }
                        >
                          Climatiseur
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            navigate(
                              `/productCategory/${encodeURIComponent(
                                "TELECOMANDE RECEPTEURS"
                              )}`
                            )
                          }
                        >
                          Récepteur
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Nav.Item>
                  <Nav.Item>
                    <div class="dropdown" id="tropdown">
                      <button class="dropdown-btn">
                        <span id="texttt">Cablage</span>{" "}
                        <span class="dropdown-arrow">&#9662;</span>
                      </button>
                      <div class="dropdown-content">
                        <a href="#">C.Secteur</a>
                        <div class="nested-dropdown">
                          <button class="dropdown-btn">
                            C.HDMI <span class="dropdown-arrow">&#9662;</span>
                          </button>
                          <div class="dropdown-content">
                            <a href="#">4k</a>
                            <a href="#">1.4</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="#link" style={{ color: "black" }}>
                      Categorie 5
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Header>
            </Card>
          </div>
          <div id="mycard">
            {/* div of Bienvenue */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "3%",
              }}
            >
      
      <div id="BrushCursor">
  <div className="container1">
    <div className="p p1">Bienvenue à ElectroZayn</div>
    <div className="p p2">Bienvenue à ElectroZayn</div>
    <div className="p p3">
      Bienvenue à ElectroZayn
      <div className="cursor"></div>
    </div>
  </div>
</div>
               
      
            </div>
            {/* div of Dividers Promotions */}
            <div
                id="promotion"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Divider
                sx={{ flex: "1", backgroundColor: "#e8b623", height: "4px" }}
              />
              <span
               id="mypromotion"
              >
                Promotions
              </span>
              <Divider
                sx={{ flex: "10", backgroundColor: "#e8b623", height: "4px" }}
              />
            </div>
            {/* div of Cards promotions */}
            <div className="allcards">
              {data
                .filter((el) => el.Promo_price > 0)
                .slice(0, displayCount)
                .map((el) => (
                  <div
                    key={el.id}
                    style={{
                      width: "100%",
                      marginBottom: "3%",
                      padding: "10px",
                      maxWidth: "300px",
                      display: "inline-flex",
                      flexWrap: "wrap",
                    }}
                  >
                    <Card
                      style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)" }}
                    >
                      <Card.Img
                        variant="top"
                        src={el.product_image}
                        style={{ height: "300px" }}
                        onClick={() => navigate(`/productinfo/${el.id}`)}
                        alt={el.product_name}
                      />
                      <Card.Body
                        style={{ textAlign: "center", width: "276px" }}
                      >
                        <Card.Title style={{ fontFamily: "Arial, sans-serif" }}>
                          {el.product_name.slice(0, 27)}
                        </Card.Title>
                        <Card.Text className={classes.originalPrice}>
                          Original Price: {el.Origin_price} TND
                        </Card.Text>
                        <Card.Text className={classes.promoPrice}>
                          Promo Price: {el.Promo_price} TND
                        </Card.Text>
                        <Button
                          onClick={
                            token
                              ? () => AddTocard(el.id)
                              : () => navigate("/login")
                          }
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
                      </Card.Body>
                    </Card>
                  </div>
                ))}
            </div>
            <div className="showmore">
              {displayCount <
                data.filter((el) => el.Promo_price > 0).length && (
                <Button
                  variant="primary"
                  onClick={handleShowMore}
                  style={{ margin: "0 auto", marginTop: "3%" }}
                >
                  Show More...
                </Button>
              )}
            </div>

            {/* div of Dividers Produits tendances */}
            <div
              style={{ display: "flex", alignItems: "center", marginTop: "3%" }}
            >
              <Divider
                sx={{ flex: "1", backgroundColor: "#e8b623", height: "4px" }}
              />
              <span
                id="Tendences"
              >
                Produits Tendances
              </span>
              <Divider
                sx={{ flex: "10", backgroundColor: "#e8b623", height: "4px" }}
              />
            </div>

            {/* div of Cards Produits tendances */}
            <div className="allcards">
              {data
                .filter(
                  (el) =>
                    el.catigory === "TELECOMONDE CLIMATISEURS" ||
                    el.catigory === "accessoires trottinette & velo électrique"
                )
                .slice(0, displayCount)
                .map((el) => (
                  <div
                    key={el.product_name}
                    style={{
                      width: "100%",
                      marginBottom: "3%",
                      padding: "10px",
                      maxWidth: "300px",
                      display: "inline-flex",
                      flexWrap: "wrap",
                    }}
                  >
                    <Card
                      style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)" }}
                    >
                      <Card.Img
                        variant="top"
                        src={el.product_image}
                        style={{ height: "300px" }}
                        onClick={() => navigate(`/productinfo/${el.id}`)}
                        alt={el.product_name}
                      />
                      <Card.Body
                        style={{ textAlign: "center", width: "276px" }}
                      >
                        <Card.Title>{el.product_name}</Card.Title>
                        {el.Promo_price > 0 ? (
                          <>
                            <Card.Text className={classes.originalPrice}>
                              Original Price: {el.Origin_price} TND
                            </Card.Text>
                            <Card.Text className={classes.promoPrice}>
                              Promo Price: {el.Promo_price} TND
                            </Card.Text>
                          </>
                        ) : (
                          <>
                            <Card.Text className={classes.promoPrice}>
                              Price: {el.Origin_price} TND
                            </Card.Text>
                          </>
                        )}
                        <Button
                          onClick={
                            token
                              ? () => AddTocard(el.id)
                              : () => navigate("/login")
                          }
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
                      </Card.Body>
                    </Card>
                  </div>
                ))}
            </div>
            <div className="showmore">
              {displayCount <
                data.filter((el) => el.Promo_price > 0).length && (
                <Button
                  variant="primary"
                  onClick={handleShowMore}
                  style={{ margin: "0 auto", marginTop: "3%" }}
                >
                  Show More...
                </Button>
              )}
            </div>
            <br />

            {/* div of Dividers Nouveautés */}
            <div
              style={{ display: "flex", alignItems: "center", marginTop: "3%" }}
            >
              <Divider
                sx={{ flex: "1", backgroundColor: "#e8b623", height: "4px" }}
              />
              <span
                id="Tendences"
              >
                Nouveautés
              </span>
              <Divider
                sx={{ flex: "10", backgroundColor: "#e8b623", height: "4px" }}
              />
            </div>

            {/* div of Cards Nouveautés */}
            <div className="allcards">
              {filteredData.slice(0, displayCount).map((el) => (
                <div
                  key={el.product_name}
                  style={{
                    width: "100%",
                    marginBottom: "3%",
                    padding: "10px",
                    maxWidth: "300px",
                    display: "inline-flex",
                    flexWrap: "wrap",
                  }}
                >
                  <Card style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)" }}>
                    <Card.Img
                      variant="top"
                      src={el.product_image}
                      style={{ height: "300px" }}
                      onClick={() => navigate(`/productinfo/${el.id}`)}
                      alt={el.product_name}
                    />
                    <Card.Body style={{ textAlign: "center", width: "276px" }}>
                      <Card.Title>{el.product_name}</Card.Title>
                      {el.Promo_price > 0 ? (
                        <>
                          <Card.Text className={classes.originalPrice}>
                            Original Price: {el.Origin_price} TND
                          </Card.Text>
                          <Card.Text className={classes.promoPrice}>
                            Promo Price: {el.Promo_price} TND
                          </Card.Text>
                        </>
                      ) : (
                        <>
                          <Card.Text className={classes.promoPrice}>
                            Price: {el.Origin_price} TND
                          </Card.Text>
                        </>
                      )}
                      <Button
                        onClick={
                          token
                            ? () => AddTocard(el.id)
                            : () => navigate("/login")
                        }
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
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
            <div className="showmore">
              {displayCount < filteredData.length && (
                <Button
                  variant="primary"
                  onClick={handleShowMore}
                  style={{ margin: "0 auto", marginTop: "3%" }}
                >
                  Show More...
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HomePage;

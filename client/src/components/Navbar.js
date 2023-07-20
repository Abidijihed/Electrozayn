import React, {useEffect, useState } from "react";
import logo from "./logo.png";
import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  InputBase,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
} from "@mui/material";
import { Menu, makeStyles } from "@material-ui/core";
import ChekoutNew from "./Checkout";
import { alpha } from "@mui/material/styles";
import {
  FaShoppingCart,
  FaUser,
  FaInfo,
  FaSignInAlt,
  FaSearch,
  FaBars,
} from "react-icons/fa";
import { MdOutlineMailOutline, MdOutlineAddShoppingCart } from "react-icons/md";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  get_shopcard } from "../redux/action/Action";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#e8b623",
    zIndex: theme.zIndex.drawer + 1,
    display: "flex",
    justifyContent: "space-around",
    [theme.breakpoints.up("md")]: {
      justifyContent: "space-around",
    },
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    display: "flex",
    alignItems: "center",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchInput: {
    marginLeft: theme.spacing(1),
    color: "black",
    backgroundColor: "white",
  },
  searchIcon: {
    marginLeft: theme.spacing(1),
    color: "black",
  },
  navIcons: {
    display: "flex",
    alignItems: "initial",
  },
  navIcon: {
    marginLeft: theme.spacing(2),
    fontSize: "25px",
    "&:hover": {
      backgroundColor: "white",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
}));

const Navbar = ({ handleChange, shop, getlengthShop, user }) => {
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const dispatch=useDispatch()

useEffect(()=>{
  const id=localStorage.getItem('id')
 dispatch(get_shopcard(id))
},[dispatch])
  const data=useSelector((state)=>state.shopcard)

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <Typography
          variant="h6"
          align="center"
          style={{ marginTop: "10px", textDecoration: "underline" }}
          component={Link}
          to="/"
        >
          Electrozayne
        </Typography>
      </div>
      <Divider />
      <List>
        <ListItem button component={Link} to="/products">
          <ListItemIcon>
            <MdOutlineAddShoppingCart />
          </ListItemIcon>
          <ListItemText primary="Product List" />
        </ListItem>

        <ListItem button component={Link} to="/about">
          <ListItemIcon>
            <FaInfo />
          </ListItemIcon>
          <ListItemText primary="About Us" />
        </ListItem>
        {!token && (
          <ListItem button component={Link} to="/login">
            <ListItemIcon>
              <FaSignInAlt />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
        )}
        {token && (
          <ListItem button component={Link} to="/profile">
            <ListItemIcon>
              <FaUser />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        )}
        <Divider />
        <ListItem button component={Link} to="/contact">
          <ListItemIcon>
            <MdOutlineMailOutline />
          </ListItemIcon>
          <ListItemText primary="Contact Us" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      {/* <div className="contactlogin">
        <div>phone contact</div>
        <div>email contact</div>
        <div>localisation</div>
        <div>Signin/signup</div>
      </div> */}
      <AppBar
        position="sticky"
        className={classes.appBar}
        sx={{ backgroundColor: "#e8b623" }}
      >
        <Toolbar className="mynavbar">
          <Avatar
            alt="logo"
            src={logo}
            sx={{ mr: "10px" }}
            component={Link}
            to="/"
          />

          {/* <Hidden mdDown>
            <Typography className={classes.title} variant="h6" noWrap>
              ElectroZayn
            </Typography> */}
          {/* </Hidden> */}
          <Hidden mdUp>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="open drawer"
              onClick={handleMenuOpen}
            >
              <FaBars />
            </IconButton>
            <Menu
              style={{ marginTop: "50px", marginLeft: "60px" }}
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              {drawer}
            </Menu>
          </Hidden>
          {/* <Hidden smDown> */}
          <div className={classes.search} id="allsearch">
            <div className={classes.searchIcon}>
              <FaSearch />
            </div>
            <InputBase
              id="search"
              placeholder="Search..."
              onChange={(e) => handleChange(e)}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              className={classes.searchInput}
            />
          </div>
          {/* </Hidden> */}
          <div className={classes.navIcons}>
            <Hidden smDown>
              <IconButton
                color="inherit"
                className={classes.navIcon}
                component={Link}
                to="/profile"
              >
                {/* <FaUser /> */}
                Profile
              </IconButton>
              {!token && (
                <IconButton
                  color="inherit"
                  className={classes.navIcon}
                  component={Link}
                  to="/login"
                >
                  {/* <FaSignInAlt /> */}
                  Login
                </IconButton>
              )}
              <IconButton
                color="inherit"
                className={classes.navIcon}
                component={Link}
                to="/contact"
              >
                {/* <FaPhoneAlt /> */}
                Contact Us
              </IconButton>
              <IconButton
                color="inherit"
                className={classes.navIcon}
                component={Link}
                to="/about"
              >
                {/* <FaInfo /> */}
                About Us
              </IconButton>
              <IconButton
                color="inherit"
                className={classes.navIcon}
                component={Link}
                to="/products"
              >
                {/* <MdOutlineAddShoppingCart /> */}
                Products
              </IconButton>
            </Hidden>
            <IconButton color="inherit">
              <Badge
                badgeContent={data.length}
                color="secondary"
                onClick={data.length>0?() => handleOpen(): Swal.fire("Please select a product")}
              >
                <FaShoppingCart fontSize="xlarge" color="white" />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <ChekoutNew
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        user={user}
        data={data}
      />
    </>
  );
};

export default Navbar;

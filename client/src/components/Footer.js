import {
  Typography,
  makeStyles,
  Link,
  Grid,
  Container,
  TextField,
  Button,
} from "@material-ui/core";
import React from "react";
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiOutlineMail, AiFillHome } from "react-icons/ai";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#232F3E",
    color: "#fff",
    padding: theme.spacing(4, 0),
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    marginRight: "55px",
    marginLeft: "45px",
  },
  link: {
    margin: theme.spacing(1, 0),
    color: "#fff",
  },
  contactInfo: {
    marginBottom: theme.spacing(2),
  },
  footerText: {
    color: "#fff",
  },
  newsletterContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(3),
    border: "none",
    width: "400px",
  },
  newsletterInput: {
    marginRight: theme.spacing(2),
    backgroundColor: "white",
    color: "black",
    borderRadius: "5px",
    width: "400px",
  },
  // Adjust the column style for smaller screens
  column: {
    display: "flex",
    flexDirection: "column",
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      marginRight: 0,
      marginLeft: 0,
      marginBottom: theme.spacing(2),
    },
  },
  // Adjust the Grid item sizes for smaller screens
  gridItem: {
    [theme.breakpoints.down("xs")]: {
      maxWidth: "100%",
    },
  },
  // Adjust the newsletter container style for smaller screens
  newsletterContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
  },
  // Adjust the newsletter input style for smaller screens
  newsletterInput: {
    marginRight: 0,
    marginBottom: theme.spacing(2),
    backgroundColor: "white",
    color: "black",
    borderRadius: "5px",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginRight: theme.spacing(2),
      marginBottom: 0,
      width: "auto",
    },
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{ backgroundColor: "#e8b623" }}>
      <Container maxWidth="lg" className={classes.container}>
        <div className={classes.column}>
          <Typography
            variant="body1"
            gutterBottom
            className={classes.contactInfo}
          >
            <BsFillTelephoneFill /> +216 51 511 966
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            className={classes.contactInfo}
          >
            <BsFillTelephoneFill /> +216 55 181 417
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            className={classes.contactInfo}
          >
            <AiOutlineMail /> Electrozayne@gmail.com
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            className={classes.contactInfo}
          >
            <AiFillHome /> 1 Rue de Pirée rue d'Athènes Tunis 1000
          </Typography>
        </div>

        <Grid container>
          <Grid
            item
            xs={12}
            sm={4}
            className={classes.gridItem}
            style={{ display: "grid" }}
          >
            <Typography
              variant="subtitle1"
              gutterBottom
              className={classes.footerText}
              style={{ textDecoration: "underline" }}
            >
              Get to Know Us
            </Typography>
            <Link href="/about" className={classes.link}>
              About Us
            </Link>
            <Link href="Login" className={classes.link}>
              Login
            </Link>
            <Link href="#" className={classes.link}>
              Press Releases
            </Link>
            <Link href="/contact" className={classes.link}>
              Electrozayn Contact
            </Link>
          </Grid>
          <Grid item xs={12} sm={4} className={classes.gridItem}>
            <Typography
              variant="subtitle1"
              gutterBottom
              className={classes.footerText}
              style={{ textDecoration: "underline" }}
            >
              Payment Products
            </Typography>
            <Link href="#" className={classes.link}>
              VISA Business Card
            </Link>
          </Grid>
          <Grid item xs={12} sm={4} className={classes.gridItem}>
            <Typography
              variant="subtitle1"
              gutterBottom
              className={classes.footerText}
              style={{ textDecoration: "underline" }}
            >
              Sign up for our newsletter
            </Typography>
            <div className={classes.newsletterContainer}>
              <TextField
                label="Enter your email"
                size="small"
                className={classes.newsletterInput}
              />
              <Button variant="contained" color="primary">
                Subscribe
              </Button>
            </div>
          </Grid>
        </Grid>
      </Container>
      <Typography
        variant="caption"
        align="center"
        className={classes.footerText}
        style={{ display: "flex", justifyContent: "center" }}
      >
        &copy; 2023 Electrozayn.com, Inc. or its affiliates
      </Typography>
    </div>
  );
}

export default Footer;

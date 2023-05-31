import { Typography, makeStyles, Link, Grid, Container,TextField, Button } from '@material-ui/core';
import React from 'react';
import './App.css';
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiOutlineMail, AiFillHome } from "react-icons/ai";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#232F3E',
    color: '#fff',
    padding: theme.spacing(4, 0),
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: theme.spacing(4),
  },
  link: {
    margin: theme.spacing(1, 0),
    color: '#fff',
  },
  contactInfo: {
    marginBottom: theme.spacing(2),
  },
  footerText: {
    color: '#fff',
  },
  newsletterContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(4),
  },
  newsletterInput: {
    marginRight: theme.spacing(2),
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="lg" className={classes.container}>
        <div className={classes.column}>
          <Typography variant="body1" gutterBottom className={classes.contactInfo}>
            <BsFillTelephoneFill /> +216 22 181 411
          </Typography>
          <Typography variant="body1" gutterBottom className={classes.contactInfo}>
            <BsFillTelephoneFill /> +216 55 181 417
          </Typography>
          <Typography variant="body1" gutterBottom className={classes.contactInfo}>
            <AiOutlineMail /> aymensatellite@gmail.com
          </Typography>
          <Typography variant="body1" gutterBottom className={classes.contactInfo}>
            <AiFillHome /> 1 Rue de Pirée rue d'Athènes Tunis 1000
          </Typography>
        </div>
    
        <Grid container>
          <Grid item xs={6} sm={3} style={{display:"flow-root"}}>
            <Typography variant="subtitle1" gutterBottom className={classes.footerText}>
              Get to Know Us
            </Typography>
            <Link href="#" className={classes.link}>About Us</Link>
            <Link href="#" className={classes.link}>Careers</Link>
            <Link href="#" className={classes.link}>Press Releases</Link>
            <Link href="#" className={classes.link}>Electrozayn Contact</Link>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="subtitle1" gutterBottom className={classes.footerText}>
           Payment Products
            </Typography>
            <Link href="#" className={classes.link}>VISA Business Card</Link>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" gutterBottom className={classes.footerText}>
            Sign up for our newsletter
          </Typography>
          <div className={classes.newsletterContainer}>
            <TextField
              label="Enter your email"
              variant="outlined"
              size="small"
              className={classes.newsletterInput}
            />
            <Button variant="contained" color="primary">
              Subscribe
            </Button>
          </div>
        </Grid>
      </Container>
      <Typography variant="caption" align="center" className={classes.footerText} style={{display:"flex",
    justifyContent:"center"}}>
        &copy; 2023 Electrozayn.com, Inc. or its affiliates
      </Typography>
    </div>
  );
}

export default Footer;

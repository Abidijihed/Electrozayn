import { Typography, makeStyles, Link } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './App.css';
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiOutlineMail, AiFillHome } from "react-icons/ai";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',  // Update the flexDirection to 'row'
    alignItems: 'flex-start', // Align items to the start of the row
    justifyContent: 'flex-start', // Align items to the start of the row
    marginTop: theme.spacing(10),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
  },
  link: {
    margin: theme.spacing(1),
  },
  contactInfo: {
    marginRight: theme.spacing(2), // Add margin to separate contact info from links
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.contactInfo}>
        <Typography variant="body1" gutterBottom>
          <BsFillTelephoneFill /> +216 22 181 411
        </Typography>
        <Typography variant="body1" gutterBottom>
          <BsFillTelephoneFill /> +216 55 181 417
        </Typography>
        <Typography variant="body1" gutterBottom>
          <AiOutlineMail /> aymensatellite@gmail.com
        </Typography>
        <Typography variant="body1" gutterBottom>
          <AiFillHome /> 1 Rue de Pirée rue d'Athènes Tunis 1000
        </Typography>
      </div>
      <Typography>
        <Link href="#" className={classes.link}>About Us</Link>
        <Link href="#" className={classes.link}>Privacy Policy</Link>
        <Link href="#" className={classes.link}>Terms of Use</Link>
        <Link href="#" className={classes.link}>Contact Us</Link>
      </Typography>
      <Typography variant="caption">&copy; 2023 Electrozayn.com, Inc. or its affiliates</Typography>
    </div>
  );
}

export default Footer;

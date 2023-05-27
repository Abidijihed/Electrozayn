import { Typography, makeStyles, Link } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './App.css';
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiOutlineMail,AiFillHome } from "react-icons/ai";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(10),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
  },
  link: {
    margin: theme.spacing(1),
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    
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

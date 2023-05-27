import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(10),
  },
}));

function ContactPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h3" align="center">Contact Us</Typography>
    </div>
  );
}

export default ContactPage;

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiOutlineMail, AiFillHome } from "react-icons/ai";
import backgroundImage from './bg.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  searchButton: {
    marginLeft: theme.spacing(2),
  },
  comingSoonWrapper: {
    // backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: 'calc(100vh - 64px)', // minus the height of the navbar
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  comingSoonContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    textAlign: 'center',
  },
}));

function HomePage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.comingSoonWrapper}>
        <div className={classes.comingSoonContent}>
          <Typography variant="h2" gutterBottom>
            Coming Soon...
          </Typography>
          <Typography variant="h5" paragraph>
            Website under construction
          </Typography>
          <Typography variant="body1" gutterBottom>
            <BsFillTelephoneFill/> +216 22 181 411
          </Typography>
          <Typography variant="body1" gutterBottom>
            <BsFillTelephoneFill/> +216 55 181 417
          </Typography>
          <Typography variant="body1" gutterBottom>
            <AiOutlineMail/> aymensatellite@gmail.com
          </Typography>
          <Typography variant="body1" gutterBottom>
            <AiFillHome/> 1 Rue de Pirée rue d'Athènes Tunis 1000
          </Typography>
        </div>
      </div>
      
    </div>
  );
}

export default HomePage;

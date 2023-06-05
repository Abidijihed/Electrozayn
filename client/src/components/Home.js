import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiOutlineMail, AiFillHome } from "react-icons/ai";
import backgroundImage from './bg.jpg';
import Carousel from 'react-bootstrap/Carousel';
import ListProducts from "./ListProduct"
import axios from 'axios';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop:"30px",
    
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

function HomePage({search}) {
  const [data, setData] = useState([]);
  const classes = useStyles();
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
useEffect(()=>{
  axios.get("https://www.electrozayn.com/api/getAll/product").then((res) => {
    console.log(res)
    setData(res.data);
  });
},[])
  return (
   <>
   {search.length > 0 ?<div> {data?.filter(
        (el) =>
          el.catigory?.toLowerCase().includes(search?.toLowerCase()) ||
          el.reference?.toLowerCase().includes(search?.toLowerCase()) ||
          el.product_name?.toLowerCase().includes(search?.toLowerCase())
      )
      .map((el) => (
        <ListProducts data={el} key={el.id} />
      ))}
   </div>
    : <div className={classes.root}>
    <div style={{justifyContent:"center",display:"flex"}}>
     <Carousel activeIndex={index} onSelect={handleSelect} className='mycarousel' >
    <Carousel.Item >
      <img
      style={{height:"300px"}}
        className="d-block w-100"
        src="http://res.cloudinary.com/dycjej355/image/upload/v1685707087/WhatsApp_Image_2023-05-31_at_22.43.42_qjeslt.jpg"
        alt="First slide"
      />
  
    </Carousel.Item>
    <Carousel.Item>
      <img
       style={{height:"300px"}}
        className="d-block w-100"
        src="http://res.cloudinary.com/dycjej355/image/upload/v1685707087/WhatsApp_Image_2023-05-31_at_22.43.42_qjeslt.jpg"
        alt="Second slide"
      />

     
    </Carousel.Item>
    <Carousel.Item>
      <img
       style={{height:"300px"}}
        className="d-block w-100"
        src="http://res.cloudinary.com/dycjej355/image/upload/v1685707087/WhatsApp_Image_2023-05-31_at_22.43.42_qjeslt.jpg"
        alt="Third slide"
      />

    
    </Carousel.Item>
  </Carousel>
  </div>
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
    
    }
    </>
  );
}

export default HomePage;

import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@mui/material/Divider';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiOutlineMail, AiFillHome } from "react-icons/ai";
import backgroundImage from './bg.jpg';
import {Carousel,Card,Nav} from 'react-bootstrap';
import Buttoon from 'react-bootstrap/Button';
import ListProducts from "./Product"
import axios from 'axios';
import {MdOutlineAddShoppingCart} from "react-icons/md";
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

function HomePage({search,getlengthShop}) {
  const [data, setData] = useState([]);
  const classes = useStyles();
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
useEffect(()=>{
  axios.get("https://www.electrozayn.com/api/getAll/product").then((res) => {
    setData(res.data);
  });
},[])
  return (
   <>
   {search.length > 0 ?<div> {data
      .filter(
        (el) =>
          el.catigory.toLowerCase().includes(search.toLowerCase()) ||
          el.reference.toLowerCase().includes(search.toLowerCase()) ||
          el.product_name.toLowerCase().includes(search.toLowerCase())
      )
      .map((el) => (
        <ListProducts data={el} key={el.id} getlengthShop={getlengthShop} />
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
  
{/* div of the categories */ }

  <div style={{width:'100%',marginTop:'1%'}}>
  <Card>
      <Card.Header>
        <Nav variant="pills">
          <Nav.Item>
            <Nav.Link href="#link" style={{color:'black'}}>Categorie 1</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#link" style={{color:'black'}}>Categorie 2</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#link" style={{color:'black'}}>Categorie 3</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#link" style={{color:'black'}}>Categorie 4</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#link" style={{color:'black'}}>Categorie 5</Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
    </Card>
  </div>

{/* div of Bienvenue */ }
  <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:'3%'}}>
    <h1>Bienvenue à ElectroZayn</h1>
  </div>

{/* div of Dividers Produits tendances */ }
<div style={{ display: 'flex', alignItems: 'center',marginTop:'3%'}}>
  <Divider sx={{ flex: '1', backgroundColor: '#e8b623', height: '4px' }} />
  <span style={{ margin: '0 10px', fontWeight: 'bold', fontSize: '2rem' }}>Produits Tendances</span>
  <Divider sx={{ flex: '10', backgroundColor: '#e8b623', height: '4px' }} />
</div>

{/* div of Cards Produits tendances */ }
  <div style={{display:'flex', justifyContent: 'space-between', width: '100%', marginTop:'3%'}}>
  <Card style={{ marginLeft: '30px', marginRight: '30px' }}>
            <div style={{ position: 'relative' }}>
            <Card.Img variant="top" src="http://res.cloudinary.com/dycjej355/image/upload/v1685707087/WhatsApp_Image_2023-05-31_at_22.43.42_qjeslt.jpg" />
            <Buttoon variant="outline-dark" style={{position:'absolute', borderRadius: '50%', padding: '10px', fontSize: '20px',  border: 'none', background: 'none' , top: '90%', left: '90%', transform: 'translate(-50%, -50%)', textAlign: 'center'}}> <MdOutlineAddShoppingCart/> </Buttoon>
            </div>
            <Card.Body>
              <Card.Title>Nom Article</Card.Title>
              <Card.Text>
                Prix dt
              </Card.Text>
            </Card.Body>
    </Card>
  </div>

{/* div of Dividers Nouveautés */ }
<div style={{ display: 'flex', alignItems: 'center',marginTop:'3%'}}>
  <Divider sx={{ flex: '1', backgroundColor: '#e8b623', height: '4px' }} />
  <span style={{ margin: '0 10px', fontWeight: 'bold', fontSize: '2rem' }}>Nouveautés</span>
  <Divider sx={{ flex: '10', backgroundColor: '#e8b623', height: '4px' }} />
</div>

{/* div of Cards Nouveautés */ }
  <div style={{display:'flex', justifyContent: 'space-between', width: '100%', marginTop:'3%'}}>
  <Card style={{ marginLeft: '30px', marginRight: '30px' }}>
            <div style={{ position: 'relative' }}>
            <Card.Img variant="top" src="http://res.cloudinary.com/dycjej355/image/upload/v1685707087/WhatsApp_Image_2023-05-31_at_22.43.42_qjeslt.jpg" />
            <Buttoon variant="outline-dark" style={{position:'absolute', borderRadius: '50%', padding: '10px', fontSize: '20px',  border: 'none', background: 'none' , top: '90%', left: '90%', transform: 'translate(-50%, -50%)', textAlign: 'center'}}> <MdOutlineAddShoppingCart/> </Buttoon>
            </div>
            <Card.Body>
              <Card.Title>Nom Article</Card.Title>
              <Card.Text>
                Prix dt
              </Card.Text>
            </Card.Body>
    </Card>
  </div>

  {/* div of Dividers Promotions */ }
<div style={{ display: 'flex', alignItems: 'center',marginTop:'3%'}}>
  <Divider sx={{ flex: '1', backgroundColor: "#e8b623", height: '4px' }} />
  <span style={{ margin: '0 10px', fontWeight: 'bold', fontSize: '2rem' }}>Promotions</span>
  <Divider sx={{ flex: '10', backgroundColor: "#e8b623", height: '4px' }} />
</div>

{/* div of Cards promotions */ }
  <div style={{display:'flex', justifyContent: 'space-between', width: '100%', marginTop:'3%'}}>
  <Card style={{ marginLeft: '30px', marginRight: '30px' }}>
            <div style={{ position: 'relative' }}>
            <Card.Img variant="top" src="http://res.cloudinary.com/dycjej355/image/upload/v1685707087/WhatsApp_Image_2023-05-31_at_22.43.42_qjeslt.jpg" />
            <Buttoon variant="outline-dark" style={{position:'absolute', borderRadius: '50%', padding: '10px', fontSize: '20px',  border: 'none', background: 'none' , top: '90%', left: '90%', transform: 'translate(-50%, -50%)', textAlign: 'center'}}> <MdOutlineAddShoppingCart/> </Buttoon>
            </div>
            <Card.Body>
              <Card.Title>Nom Article</Card.Title>
              <Card.Text>
                Prix dt
              </Card.Text>
            </Card.Body>
    </Card>
  </div>  
  </div>
    
    }
    </>
  );
}

export default HomePage;

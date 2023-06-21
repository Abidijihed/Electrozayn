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
import { differenceInDays, parse } from 'date-fns';

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
  promoPrice: {
    color: "green",
  },
  originalPrice: {
    color: "red",
    textDecoration: "line-through",
  },
}));

function HomePage({search,getlengthShop}) {
  const [data, setData] = useState([]);
  const classes = useStyles();
  const [index, setIndex] = useState(0);
  const [displayCount, setDisplayCount] = useState(5);

  const handleShowMore = () => {
    setDisplayCount(displayCount + 5);
  };
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
useEffect(()=>{
  axios.get("https://www.electrozayn.com/api/getAll/product").then((res) => {
    setData(res.data);
  });
},[])

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
  <div id='mycard'>

{/* div of Bienvenue */ }
  <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:'3%'}}>
    <h1>Bienvenue à ElectroZayn</h1>
  </div>
  {/* div of Dividers Promotions */ }
  <div style={{ display: 'flex', alignItems: 'center',marginTop:'3%'}}>
  <Divider sx={{ flex: '1', backgroundColor: "#e8b623", height: '4px' }} />
  <span style={{ margin: '0 10px', fontWeight: 'bold', fontSize: '2rem' }}>Promotions</span>
  <Divider sx={{ flex: '10', backgroundColor: "#e8b623", height: '4px' }} />
</div>
  {/* div of Cards promotions */}
  <div className='allcards'>
  {data.filter((el) => el.Promo_price > 0).slice(0, displayCount).map((el) => (
    <div key={el.product_name} style={{ width: '100%', marginBottom: '3%', padding: '10px', maxWidth: '300px',display:"inline-flex",flexWrap:"wrap" }}>
      <Card>
        <Card.Img variant="top" src="http://res.cloudinary.com/dycjej355/image/upload/v1685707087/WhatsApp_Image_2023-05-31_at_22.43.42_qjeslt.jpg" style={{ height: '200px', objectFit: 'cover' }} />
        <Card.Body style={{ textAlign: 'center' }}>
          <Card.Title>{el.product_name}</Card.Title>
          <Card.Text className={classes.originalPrice}>
            Original Price: {el.Origin_price} TND
          </Card.Text>
          <Card.Text className={classes.promoPrice}>
            Promo Price: {el.Promo_price} TND
          </Card.Text>
          <Button variant="outline-dark" style={{ borderRadius: '50%', padding: '10px', fontSize: '30px', marginTop: '10px' }}>
            <MdOutlineAddShoppingCart />
          </Button>
        </Card.Body>
      </Card>
    </div>
  ))}
</div>
<div className='showmore'>
{displayCount < data.filter((el) => el.Promo_price > 0).length && (
    <Button variant="primary" onClick={handleShowMore} style={{ margin: '0 auto', marginTop: '3%' }}>
      Show More...
    </Button>
  )}
</div>



{/* div of Dividers Produits tendances */ }
<div style={{ display: 'flex', alignItems: 'center',marginTop:'3%'}}>
  <Divider sx={{ flex: '1', backgroundColor: '#e8b623', height: '4px' }} />
  <span style={{ margin: '0 10px', fontWeight: 'bold', fontSize: '2rem' }}>Produits Tendances</span>
  <Divider sx={{ flex: '10', backgroundColor: '#e8b623', height: '4px' }} />
</div>

{/* div of Cards Produits tendances */ }
<div className='allcards'>
  {data.filter((el) => el.Promo_price > 0).slice(0, displayCount).map((el) => (
    <div key={el.product_name} style={{ width: '100%', marginBottom: '3%', padding: '10px', maxWidth: '300px',display:"inline-flex",flexWrap:"wrap" }}>
      <Card>
        <Card.Img variant="top" src="http://res.cloudinary.com/dycjej355/image/upload/v1685707087/WhatsApp_Image_2023-05-31_at_22.43.42_qjeslt.jpg" style={{ height: '200px', objectFit: 'cover' }} />
        <Card.Body style={{ textAlign: 'center' }}>
          <Card.Title>{el.product_name}</Card.Title>
          <Card.Text className={classes.originalPrice}>
            Original Price: {el.Origin_price} TND
          </Card.Text>
          <Card.Text className={classes.promoPrice}>
            Promo Price: {el.Promo_price} TND
          </Card.Text>
          <Button variant="outline-dark" style={{ borderRadius: '50%', padding: '10px', fontSize: '30px', marginTop: '10px' }}>
            <MdOutlineAddShoppingCart />
          </Button>
        </Card.Body>
      </Card>
    </div>
  ))}
</div>
<div className='showmore'>
{displayCount < data.filter((el) => el.Promo_price > 0).length && (
    <Button variant="primary" onClick={handleShowMore} style={{ margin: '0 auto', marginTop: '3%' }}>
      Show More...
    </Button>
  )}
</div>

{/* div of Dividers Nouveautés */ }
<div style={{ display: 'flex', alignItems: 'center',marginTop:'3%'}}>
  <Divider sx={{ flex: '1', backgroundColor: '#e8b623', height: '4px' }} />
  <span style={{ margin: '0 10px', fontWeight: 'bold', fontSize: '2rem' }}>Nouveautés</span>
  <Divider sx={{ flex: '10', backgroundColor: '#e8b623', height: '4px' }} />
</div>

{/* div of Cards Nouveautés */ }
<div className='allcards'>
  {filteredData.slice(0, displayCount).map((el) => (
    <div key={el.product_name} style={{ width: '100%', marginBottom: '3%', padding: '10px', maxWidth: '300px', display: 'inline-flex', flexWrap: 'wrap' }}>
        <Card>
        <Card.Img variant="top" src="http://res.cloudinary.com/dycjej355/image/upload/v1685707087/WhatsApp_Image_2023-05-31_at_22.43.42_qjeslt.jpg" style={{ height: '200px', objectFit: 'cover' }} />
        <Card.Body style={{ textAlign: 'center' }}>
          <Card.Title>{el.product_name}</Card.Title>
        {el.Promo_price>0?
          <>
          <Card.Text className={classes.originalPrice}>
            Original Price: {el.Origin_price} TND
          </Card.Text>
          <Card.Text className={classes.promoPrice}>
            Promo Price: {el.Promo_price} TND
          </Card.Text>
          </>
          :<>
           <Card.Text className={classes.promoPrice}>
             Price: {el.Origin_price} TND
          </Card.Text>
          </>
          }
          <Button variant="outline-dark" style={{ borderRadius: '50%', padding: '10px', fontSize: '30px', marginTop: '10px' }}>
            <MdOutlineAddShoppingCart />
          </Button>
        </Card.Body>
      </Card>
    </div>
  ))}
</div>
<div className='showmore'>
  {displayCount < filteredData.length && (
    <Button variant="primary" onClick={handleShowMore} style={{ margin: '0 auto', marginTop: '3%' }}>
      Show More...
    </Button>
  )}
</div>


  </div>
  </div>
    }
    </>
  );
}

export default HomePage;

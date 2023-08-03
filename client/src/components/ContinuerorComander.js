import React ,{ useEffect, useState }from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import ChekoutNew from './Checkout';
import { useDispatch, useSelector } from 'react-redux';
import { get_shopcard } from '../redux/action/Action';

export default function ContinuerorComander({show,handleClose,product}) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState([]);

  const dispatch=useDispatch()
  useEffect(() => {
    const user_id = localStorage.getItem("id");
    axios
      .get("https://www.electrozayn.com/api/user/getone/" + user_id)
      .then((res) => {
        setUser(res.data);
      });
  }, [user]);
  const handleOpen = () => {
    setOpen(true);
    handleClose()
  };

  const handleClose1 = () => {
    setOpen(false);
  };
  useEffect(()=>{
    const id=localStorage.getItem('id')
   dispatch(get_shopcard(id))
  },[dispatch])
    const data=useSelector((state)=>state.shopcard)
  
  return (
    <>
 <Modal show={show} onHide={handleClose}
  style={{marginTop:"7%"}}
  >
      <Modal.Header closeButton>
        <Modal.Title>Produit ajouter avec seccess</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{display:"flex",justifyContent:"center"}}>
      <Card style={{ width: '18rem',height:"23rem" }}>
      <Card.Img variant="top" src={product?.product_image} style={{height:"50%"}} alt={product?.product_image}/>
      <Card.Body>
        <Card.Title>{product?.product_name}</Card.Title>
        <Card.Text>
          Prix:{(Number(product?.Promo_price))>0?product?.Promo_price:product?.Origin_price} {" "} TND
        </Card.Text>
      </Card.Body>
    </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleOpen}>
          Comander 
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Continer Votre achat
        </Button>
      </Modal.Footer>
    </Modal>
    <ChekoutNew
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose1}
        user={user}
        data={data}
      />
  </>
  )
}

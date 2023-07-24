import React ,{ useEffect, useState }from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

export default function ContinuerorComander({show,handleClose,product}) {
// const [oneproduct,setOneproduct]=useState([])
// useEffect(()=>{
//   axios.get("http://localhost:5500/api/get_one_product/"+id)
//   .then((res)=>{
//     setOneproduct(res.data)
//     console.log(res.data)
//   })
// },[oneproduct])

  
    
  return (
    <>
 <Modal show={show} onHide={handleClose}
  style={{marginTop:"10%"}}
  >
      <Modal.Header closeButton>
        <Modal.Title>Produit ajouter avec seccess</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={product?.product_image} />
      <Card.Body>
        <Card.Title>{product?.product_name}</Card.Title>
        <Card.Text>
          {product?.description}
        </Card.Text>
      </Card.Body>
    </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Comander 
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Continer Votre achat
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  )
}

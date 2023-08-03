import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import UpdateModal from './UpdateModal';
import React,{ useState } from 'react';

function InfoAdmin({product}) {
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  return (
    <>
    <Card style={{ width: '18rem' ,marginBottom:"5px"}}>
      <Card.Img variant="top" src={product.product_image}  alt={product.product_name}/>
      <Card.Body>
        <Card.Title>{product.product_name}</Card.Title>
        <Card.Text>
        {product.description}<br />
        {product.stockquantity}<br />
        </Card.Text>
        <Button variant="primary" onClick={() => setOpenUpdateModal(true)}>updated</Button>
      </Card.Body>
    </Card>
       <UpdateModal
       open={openUpdateModal}
       handleClose={() => setOpenUpdateModal(false)}
       product={product}
       id={product.id}
     />
     </>
  );
}

export default InfoAdmin;
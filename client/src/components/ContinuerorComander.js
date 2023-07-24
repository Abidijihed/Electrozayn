import React ,{ useState }from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';

export default function ContinuerorComander({show,handleClose,id}) {

    
  return (
    <>
 <Modal show={show} onHide={handleClose}>
    {console.log(id)}
      <Modal.Header closeButton>
        <Modal.Title>Produit ajouter avec seccess</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
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

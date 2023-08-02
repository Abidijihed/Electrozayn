import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const OrderForm = ({ role }) => {
  const [orderItems, setOrderItems] = useState([]);
  const [FirstName, setFirstName] = useState('');
  const [Email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState('');
  const [Zip, setZip] = useState('');

  const handleAddItem = () => {
    setOrderItems([...orderItems, { productName: '', quantity: 1 }]);
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...orderItems];
    updatedItems[index][field] = value;
    setOrderItems(updatedItems);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://www.electrozayn.com/api/create-order', {
        FirstName: FirstName,
        Email: Email,
        address: address,
        PhoneNumber: PhoneNumber,
        country: country,
        Zip: Zip,
        orderItems: orderItems,
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div>
      <h2>Order Form</h2>

      {orderItems.map((item, index) => (
        <div key={index}>
          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              value={item.productName}
              onChange={(e) => handleItemChange(index, 'productName', e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter quantity"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
            />
          </Form.Group>
        </div>
      ))}
      <Button variant="primary" onClick={handleAddItem}>
        Add Product
      </Button>
      <Form.Group className="mb-3">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" placeholder="Enter FirstName" onChange={(e) => setFirstName(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Address</Form.Label>
        <Form.Control type="text" placeholder="Enter Address" onChange={(e)=>setAddress(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>PhoneNumber</Form.Label>
        <Form.Control type="number" placeholder="Enter PhoneNumber" onChange={(e)=>setPhoneNumber(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Country</Form.Label>
        <Form.Control type="text" placeholder="Enter Country" onChange={(e)=>setCountry(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Zip</Form.Label>
        <Form.Control type="text" placeholder="Enter code postal" onChange={(e)=>setZip(e.target.value)}/>
      </Form.Group>
      <Button variant="primary" onClick={handleSubmit}>
        Submit Order
      </Button>
    </div>
  );
};

export default OrderForm;

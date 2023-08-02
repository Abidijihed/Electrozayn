import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
const OrderForm = ({role}) => {

  const [reference,setReference]=useState("")
  const [FirstName,setFirstName]=useState("")
  const [Email,setEmail]=useState("")
  const [address,setAddress]=useState("")
  const [PhoneNumber,setPhoneNumber]=useState("")
  const [country,setCountry]=useState("")
  const [Zip,setZip]=useState("")
  const [total_price,setTotal_price]=useState(0)
  
  const handleSubmit = async () => {
    try {
      // Send the order data to the backend using an API call
      await axios.post('http://localhost:5500/api/create-order',{
        reference:reference,
        FirstName:FirstName,
        Email:Email,
        address:address,
        PhoneNumber:PhoneNumber,
        country:country,
        Zip:Zip,
        total_price:total_price
      }).then((res)=>{
        console.log(res)

      })
    } catch (error) {
      // Handle errors if the API call fails
      console.error('Error creating order:', error);
    }
  };

  return (
    <div>
      <h2>Order Form</h2>
      <Form.Group className="mb-3" >
        <Form.Label>Reference</Form.Label>
        <Form.Control type="text" placeholder="Enter reference" onChange={(e)=>setReference(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>FirstName</Form.Label>
        <Form.Control type="text" placeholder="Enter FirstName" onChange={(e)=>setFirstName(e.target.value)}/>
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
      <Form.Group className="mb-3" >
        <Form.Label>total_price</Form.Label>
        <Form.Control type="number" placeholder="Enter total_price" onChange={(e)=>setTotal_price(e.target.value)}/>
      </Form.Group>

        <button type="button" onClick={handleSubmit}>Submit Order</button>
      
    </div>
  );
};

export default OrderForm;

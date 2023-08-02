import React, { useState } from 'react';
import axios from 'axios';

const InvoiceGenerator = () => {
  const [orderId, setOrderId] = useState('');
  const [invoiceData, setInvoiceData] = useState(null);

  const handleInputChange = (event) => {
    setOrderId(event.target.value);
  };

  const generateInvoice = async () => {
    try {
      // Send the API call to fetch order details for the provided orderId
      const response = await axios.get(`http://localhost:5500/api/invoice/${orderId}`);
      if (response.status === 200) {
        // Set the fetched invoice data to the state
        setInvoiceData(response.data);
      } else {
        // If the response status is not 200, handle the error here
        console.error('Error fetching invoice data:', response);
      }
    } catch (error) {
      // Handle errors if the API call fails
      console.error('Error fetching invoice data:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Generate Invoice</h2>
      <div className="mb-3">
        <label htmlFor="orderId" className="form-label">Order ID:</label>
        <input
          type="text"
          className="form-control"
          value={orderId}
          onChange={handleInputChange}
        />
      </div>
      <button className="btn btn-primary" onClick={generateInvoice}>Generate Invoice</button>
      {/* Display the generated invoice data here using the pdfkit or jspdf library */}
      {invoiceData && (
        <div className="mt-4">
          <h3>Invoice Data</h3>
          <pre>{JSON.stringify(invoiceData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default InvoiceGenerator;

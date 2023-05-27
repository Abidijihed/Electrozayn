import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');

  return (
    <React.Fragment>
      {token ? children : <Navigate to="/" />}
    </React.Fragment>
  );
}

export default PrivateRoute;

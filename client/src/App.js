import React, { useEffect, useState } from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import HomePage from './components/Home';
import ContactPage from './components/Contact';
import SignupPage from './components/SignUp';
import Footer from './components/Footer';
import Profile from './components/Profile';
import Login from './components/Login'
import ListProduct from './components/ListProduct'
import About from './components/About';
import Checkout from './components/Checkout';
import "./App.css"
import axios from 'axios';
import PrivateRoute from './components/PrivateRoute'
import ProductInfo from './components/ProductsInfo';
// import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [search,setSearch]=useState("")
  const [shop, setShop] = useState('');

  const getlengthShop=() => {
    const shopValue = localStorage.getItem('shop');
    if (shopValue) {
      setShop(shopValue);
    }
  }
  const handleChange=(e)=>{
    setSearch(e.target.value)
  }
  useEffect(()=>{

setShop(shop)
  },[shop])
  return (
    
      <div>
        <BrowserRouter>
       
        <NavBar handleChange={handleChange} shop={shop} />
        <Routes>
          <Route exact path="/" element={<HomePage search={search} getlengthShop={getlengthShop}/>} />
          <Route path="/contact" element={<ContactPage/>} />
          <Route path="/signup"  element={<SignupPage/>}/>
          
         <Route path="/profile"  element={
          <PrivateRoute>
         <Profile />
         </PrivateRoute>
         }/>
         <Route path='/productinfo/:id' element={<ProductInfo />}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/chekout" element={<Checkout getlengthShop={getlengthShop}/>} />
          <Route path='/products' element={<ListProduct search={search} getlengthShop={getlengthShop}/>} />
        </Routes>
        
        <Footer />
        </BrowserRouter>
      </div>
  
  );
}

export default App;






// import Login from './components/Login';
// import SignUp from './components/SignUp';
// import Home from './components/Home';
// import {Routes,Route, BrowserRouter} from "react-router-dom"
// import Profile from './components/Profile';
// import PrivateRoutes from './components/PrivateRoute';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import NavbarComponents from './components/Navbar';


// function App() {
//   const token=localStorage.getItem('token')
//   return (
//     <div className="App">
//       <BrowserRouter >
//       <NavbarComponents />
//    <Routes>
//    <Route path='/' element={<Home/>}/>
//     <Route  path='/signUp' element={<SignUp/>}/>
//     {token && <Route path='profile' element={<Profile /> }/>}
//      <Route path='/Login' element={<Login/>}/>
    

//    </Routes>
   
//    </BrowserRouter>
//     </div>
//   );
// }

// export default App;
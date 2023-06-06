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
// import PrivateRoutes from './components/PrivateRoute';
// import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [check,setChek]=useState()
const [data,setData]=useState([])
  const [search,setSearch]=useState("")
  const handleChange=(e)=>{
    setSearch(e.target.value)
  }
  const getProductsCard = () => {
    axios
      .get('https://www.electrozayn.com/api/product/card')
      .then((res) => {
        const product = res.data.find((product) => product.products_id=== data.id);
        setData(res.data);
        if (product) {
          setChek(product.check_add_or_not);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(()=>{
    getProductsCard()
  },[])
  const AddToCart = (data) => {
    const user_id = localStorage.getItem('id');
    const updatedCheck = !check; // Invert the value of `check`
  if(updatedCheck === true ){
    axios
      .post(`https://www.electrozayn.com/api/product/added_to/card/${user_id}`, {
        product_name: data.product_name,
        Origin_price: data.Origin_price,
        Promo_price: data.Promo_price,
        reference: data.reference,
        product_image: data.product_image,
        check_add_or_not: updatedCheck, // Use the updated value of `check`
        products_id:data.id
  
      })
      .then((res) => {
        setChek(updatedCheck); // Update the state with the updated value
        getProductsCard()
      })
      .catch((err) => {
        console.log(err);
      });
    }else{
      axios.put(`https://www.electrozayn.com/api/update/card/${data.id}`)
      .then((res)=>{
        setChek(updatedCheck); // Update the state with the updated value
        getProductsCard()
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };
  return (
    
      <div>
        <BrowserRouter>
       
        <NavBar handleChange={handleChange} data={data.length}/>
        <Routes>
          <Route exact path="/" element={<HomePage search={search}/>} />
          <Route path="/contact" element={<ContactPage/>} />
          <Route path="/signup"  element={<SignupPage/>}/>
         <Route path="/profile"  element={<Profile />}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/chekout" element={<Checkout/>} />
          <Route path='/products' element={<ListProduct search={search} AddToCart={AddToCart} check={check}/>} />
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
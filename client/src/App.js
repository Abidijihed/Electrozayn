import React, { useState } from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import HomePage from './components/Home';
import ContactPage from './components/Contact';
import SignupPage from './components/SignUp';
import Footer from './components/Footer';
import Profile from './components/Profile';
import Login from './components/Login'
import ListProduct from './components/ListProduct'
// import PrivateRoutes from './components/PrivateRoute';

function App() {
  const [search,setSearch]=useState("")
  const handleChange=(e)=>{
    setSearch(e.target.value)
  }
  return (
    
      <div>
        {console.log(search)}
        <BrowserRouter>
       
        <NavBar handleChange={handleChange}/>
        <Routes>
          <Route exact path="/" element={<HomePage/>} />
          <Route path="/contact" element={<ContactPage/>} />
          <Route path="/signup"  element={<SignupPage/>}/>
         <Route path="/profile"  element={<Profile />}/>
          <Route path="/login" element={<Login/>} />
          <Route path='/ListProduct' element={<ListProduct search={search}/>} />
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
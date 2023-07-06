import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import HomePage from "./components/Home";
import ContactPage from "./components/Contact";
import SignupPage from "./components/SignUp";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import Login from "./components/Login";
import ListProduct from "./components/ListProduct";
import About from "./components/About";
import "./App.css";
import axios from "axios";
import PrivateRoute from "./components/PrivateRoute";
import ProductInfo from "./components/ProductsInfo";
import ProductsCatigory from "./components/ProductsCatigory";
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [search, setSearch] = useState("");
  const [shop, setShop] = useState("");
  const [user, setUser] = useState([]);
  const [role, setRole] = useState("");

  const getlengthShop = () => {
    const shopValue = localStorage.getItem("shop");
    if (shopValue) {
      setShop(shopValue);
    }
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleChangesearch = (e) => {
    setSearch("");
  };
  useEffect(() => {
    setShop(shop);
  }, [shop]);
  setTimeout(() => {
    const user_id = localStorage.getItem("id");
    axios
      .get("https://www.electrozayn.com/api/user/getone/" + user_id)
      .then((res) => {
        setUser(res.data);
        res.data.map((el) => setRole(el.role));
      });
  }, 1000);

  return (
    <div className="app-container">
      <BrowserRouter>
        <NavBar
          handleChange={handleChange}
          shop={shop}
          getlengthShop={getlengthShop}
          user={user[0]}
        />
        <Routes>
          <Route
            exact
            path="/"
            element={<HomePage search={search} getlengthShop={getlengthShop} />}
          />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile user={user} role={role} />
              </PrivateRoute>
            }
          />
          <Route
            path="/productinfo/:id"
            element={
              <ProductInfo search={search} getlengthShop={getlengthShop} />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/products"
            element={
              <ListProduct
                search={search}
                getlengthShop={getlengthShop}
                handleChangesearch={handleChangesearch}
              />
            }
          />
          <Route
            path="/productCategory/:category"
            element={<ProductsCatigory getlengthShop={getlengthShop} />}
          />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;


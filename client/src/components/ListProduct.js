import React, { useEffect, useState } from "react";
import AddProductModal from "./AddModal";
import axios from "axios";
import ListProducts from "./Product";
import { Pagination } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { get_product } from "../redux/action/Action";

function MyPage({ handleChangesearch, search, getlengthShop }) {
  const [openAddProductModal, setOpenAddProductModal] = useState(false);
  const [user, setUser] = useState([]);
const dispatch=useDispatch()

useEffect(()=>{
 dispatch(get_product())
},[dispatch])
 const data=useSelector((state)=>state.product)
  useEffect(() => {
    const user_id = localStorage.getItem("id");
    axios
      .get("https://www.electrozayn.com/api/user/getone/" + user_id)
      .then((res) => {
        setUser(res.data);
      });
  }, []);

  const handelpassfunction = () => {
    handleChangesearch();
  };

  return (
    <div>
      
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {user.map((el) => {
          return (
            <>
              {el.role === "admin" ? (
                <button onClick={() => setOpenAddProductModal(true)}>
                  Add Product
                </button>
              ) : null}
            </>
          );
        })}

        <AddProductModal
          open={openAddProductModal}
          handleClose={() => setOpenAddProductModal(false)}
          // handleAddProduct={handleAddProduct}
        />
      </div>
      <>
      
        <div style={{display:"flex",flexWrap:"wrap"}}>
          {" "}
          {data
            .filter(
              (el) =>
                el.catigory.toLowerCase().includes(search.toLowerCase()) ||
                el.reference.toLowerCase().includes(search.toLowerCase()) ||
                el.product_name.toLowerCase().includes(search.toLowerCase())
            )
            .map((el) => (
              <ListProducts
                data={el}
                key={el.id}
                getlengthShop={getlengthShop}
              />
            ))}
        </div>
      </>
      
    
    </div>
  );
}

export default MyPage;


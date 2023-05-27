import React, { useEffect, useState } from 'react';
import AddProductModal from './Modal';
import axios from 'axios';
import ListProducts from "./Product"
function MyPage() {
  const [openAddProductModal, setOpenAddProductModal] = useState(false);
const [user,setUser]=useState([])
const [data,setData]=useState([])
  const handleAddProduct = (product) => {
    // Handle adding the product here
    console.log(product);
  };
  const getProducts=()=>{
    axios.get("https://www.electrozayn.com/api/getAll/product")
    .then((res)=>{
      setData(res.data)
      
    })
  }
  useEffect(() => {
    const user_id = localStorage.getItem("id");
    axios.get("https://www.electrozayn.com/api/user/getone/"+ user_id)
      .then((res) => {
       
        setUser(res.data);
      });
      getProducts()
  }, []);
  return (
    <div>
      
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {user.map((el)=>{
            return(
             <>
            {el.role === "admin" ?<button onClick={() => setOpenAddProductModal(true)}>Add Product</button>:null}
             </>
            )
        })}
      
      <AddProductModal
        open={openAddProductModal}
        handleClose={() => setOpenAddProductModal(false)}
        handleAddProduct={handleAddProduct}
      />

    </div>
    {data.map((el)=>(<ListProducts data={el}/>))}
    </div>
  );
}

export default MyPage;

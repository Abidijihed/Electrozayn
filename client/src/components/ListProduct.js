import React, { useEffect, useState } from "react";
import AddProductModal from "./AddModal";
import axios from "axios";
import ListProducts from "./Product";
function MyPage({ handleChangesearch,search ,getlengthShop}) {
  const [openAddProductModal, setOpenAddProductModal] = useState(false);
  const [user, setUser] = useState([]);
  const [data, setData] = useState([]);
  const handleAddProduct = (product) => {
    // Handle adding the product here
    console.log(product);
  };
  const getProducts = () => {
    axios.get("https://www.electrozayn.com/api/getAll/product").then((res) => {
      setData(res.data);
    });
  };
  useEffect(() => {
    const user_id = localStorage.getItem("id");
    axios
      .get("https://www.electrozayn.com/api/user/getone/" + user_id)
      .then((res) => {
        setUser(res.data);
      });
    getProducts();
  }, []);
  const handelpassfunction=()=>{
    handleChangesearch()
  }
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
          handleAddProduct={handleAddProduct}
        />
      </div>
      {data
        .filter(
          (el) =>
            el.catigory.toLowerCase().includes(search.toLowerCase()) ||
            el.reference.toLowerCase().includes(search.toLowerCase()) ||
            el.product_name.toLowerCase().includes(search.toLowerCase())
        )
        .map((el) => (
          <ListProducts data={el} key={el.id} getlengthShop={getlengthShop} handelpassfunction={handelpassfunction}/>
        ))}
    </div>
  );
}

export default MyPage;

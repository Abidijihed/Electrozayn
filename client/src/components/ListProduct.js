import React, { useEffect, useState } from "react";
import AddProductModal from "./Modal";
import axios from "axios";
import ListProducts from "./Product";
function MyPage({ search,AddToCart,check,data }) {
  const [openAddProductModal, setOpenAddProductModal] = useState(false);
  const [user, setUser] = useState([]);

  const handleAddProduct = (product) => {
    // Handle adding the product here
    console.log(product);
  };
  useEffect(() => {
    const user_id = localStorage.getItem("id");
    axios
      .get("https://www.electrozayn.com/api/user/getone/" + user_id)
      .then((res) => {
        setUser(res.data);
      });
  }, []);
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
          <ListProducts data={el} key={el.id} AddToCart={AddToCart} check={check}/>
        ))}
    </div>
  );
}

export default MyPage;

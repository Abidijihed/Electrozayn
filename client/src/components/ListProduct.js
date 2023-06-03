import React, { useEffect, useState } from "react";
import AddProductModal from "./Modal";
import axios from "axios";
import ListProducts from "./Product";
function MyPage({ search }) {
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
            el.catigory.tolowercase().includes(search.tolowercase()) ||
            el.reference.tolowercase().includes(search.tolowercase()) ||
            el.product_name.tolowercase().includes(search.tolowercase())
        )
        .map((el) => (
          <ListProducts data={el} key={el.id}/>
        ))}
    </div>
  );
}

export default MyPage;

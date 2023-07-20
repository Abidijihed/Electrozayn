import React, { useEffect, useState } from "react";
import AddProductModal from "./AddModal";
import axios from "axios";
import ListProducts from "./Product";
import { Pagination } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';

function MyPage({ handleChangesearch, search, getlengthShop }) {
  const [openAddProductModal, setOpenAddProductModal] = useState(false);
  const [user, setUser] = useState([]);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayData, setDisplayData] = useState([]);
// const dispatch=useDispatch()
  const cardsPerPage = 10;

 const mydata=useSelector((state)=>console.log(state))

  const getProducts = () => {
    axios.get("https://www.electrozayn.com/api/getAll/product").then((res) => {
      setData(res.data);
      setDisplayData(res.data);
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

  useEffect(() => {
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    setDisplayData(data.slice(startIndex, endIndex));
  }, [data, currentPage]);

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
      {search.length > 0 ? (
        <div>
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
        </div>):(

          <>
          {displayData
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
            handelpassfunction={handelpassfunction}
          />
        ))}
          </>
        )}
      </>
      
      <Pagination
        count={Math.ceil(data.length / cardsPerPage)}
        color="primary"
        page={currentPage}
        onChange={(event, page) => setCurrentPage(page)}
      />
    </div>
  );
}

export default MyPage;


import React, { useEffect, useState } from 'react'
import ListProducts from './Product'
import { useParams } from 'react-router-dom';
import axios from 'axios';
export default function ProductsCatigory({getlengthShop}) {
    const { category  } = useParams();
     const [data,setData]=useState([])
    useEffect(() => {
        axios.get("https://www.electrozayn.com/api/getAll/product").then((res) => {
          setData(res.data);
        });
      }, [data]);
  return (
    <div>
        
        {data
            .filter(
              (el) =>
                el.catigory.toLowerCase()===category.toLowerCase()
            )
            .map((el) => (
              <ListProducts
                data={el}
                key={el.id}
                getlengthShop={getlengthShop}
              />
            ))}
    </div>
  )
}

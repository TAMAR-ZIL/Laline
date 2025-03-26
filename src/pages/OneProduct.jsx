import { getProductById } from "../api/products"
import { useEffect, useState } from "react";
import * as React from 'react';
import '../styles/One.css'

const OneProduct = ({ id }) => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getProductById(id)
      .then((res) => {
        if (!res) {
          return <h2>לא נמצא מוצר!</h2>;
        }
        setProduct(res);
        setLoading(false)
      })
  }, [id])

  return (

    <div style={{ textAlign: "center", padding: "20px", backgroundColor: product.color }}>
      {loading ? <img src="public\images\lalin_6-1024x640.webp" className='view'
        alt=""
      /> : (
        <>
          <h1>{product.nameProduct}</h1>
          <h2>{product.price} ₪</h2>
          <img src={product.description} />
          <h3>{product.category}</h3>
          <p>{product.creationDate}</p>
        </>
      )}
    </div>
  );
};

export default OneProduct;
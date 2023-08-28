import React, { useEffect, useState } from "react";
import { TYPES } from "./UseReducer";

const addStyles = {
  width: "100%",
  backgroundColor: "green",
  borderRadius: 4,
  padding: 8,
  margin: 2,
  cursor: "pointer",
  outline: "none",
  border: "1px solid green",
};
const removeStyles = {
  width: "100%",
  backgroundColor: "red",
  borderRadius: 4,
  padding: 8,
  margin: 2,
  cursor: "pointer",
  outline: "none",
  border: "1px solid red",
};
function ProductsList({ products, cartItems, page, dispatch }) {
  console.log("Cls", products, page * 10 - 10, page);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "50px",
        justifyContent: "center",
        width: "75%",
      }}
    >
      {products.slice(page * 10 - 10, page * 10).map((prod) => (
        <div
          key={prod.id + prod.title}
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "200px",
            maxWidth: "200px",
            padding: 8,
            border: "1px solid grey",
          }}
        >
          <img
            src={prod.thumbnail}
            alt={prod.title}
            style={{ height: "200px", objectFit: "fill" }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: 5,
            }}
          >
            <p
              style={{ maxWidth: "100px", overflow: "hidden", height: "20px" }}
            >
              {prod.title}
            </p>
            <span>${prod.price}</span>
          </div>
          <div style={{ width: "100%" }}>
            {cartItems.some((it) => it.id === prod.id) ? (
              <button
                style={removeStyles}
                onClick={() =>
                  dispatch({
                    type: TYPES.REMOVE_PRODUCT_FROM_CART,
                    payload: { id: prod.id },
                  })
                }
              >
                Remove from Cart
              </button>
            ) : (
              <button
                style={addStyles}
                onClick={() =>
                  dispatch({
                    type: TYPES.ADD_PRODUCT_TO_CART,
                    payload: {
                      id: prod.id,
                      title: prod.title,
                      thumbnail: prod.thumbnail,
                      price: prod.price,
                      qty: 1,
                    },
                  })
                }
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductsList;

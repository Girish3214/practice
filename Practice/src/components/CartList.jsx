import React, { useEffect, useState } from "react";
import { TYPES } from "./UseReducer";

function CartList({ cartItems, dispatch }) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const totalAmount = cartItems.reduce(
      (curr, acc) => curr + Number(acc.price) * Number(acc.qty),
      0
    );
    setTotal(totalAmount);
    return () => {};
  }, [cartItems]);
  return (
    <div
      style={{
        width: "25%",
        backgroundColor: "#AAA",
        color: "black",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div>Cart Total: ${total}</div>
      {cartItems.map((item) => (
        <div key={item.id} style={{ display: "flex", marginBottom: 8 }}>
          <div style={{ display: "flex", gap: 16 }}>
            <img
              src={item.thumbnail}
              alt={item.title}
              style={{
                width: "100px",
                display: "flex",
                flexDirection: "column",
                height: "100px",
              }}
            />
            <div
              style={{
                width: "150px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <p
                style={{
                  maxWidth: "100px",
                  overflow: "hidden",
                  height: "20px",
                }}
              >
                {item.title}
              </p>
              <span>${item.price}</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "space-evenly",
              alignSelf: "center",
              alignItems: "center",
              gap: 8,
            }}
          >
            <button
              style={{ padding: 8 }}
              onClick={() =>
                dispatch({
                  type: TYPES.CHANGE_QUANTITY,
                  payload: {
                    id: item.id,
                    qty: item.qty - 1,
                  },
                })
              }
            >
              -
            </button>
            {item.qty}
            <button
              style={{ padding: 8 }}
              onClick={() =>
                dispatch({
                  type: TYPES.CHANGE_QUANTITY,
                  payload: {
                    id: item.id,
                    qty: item.qty + 1,
                  },
                })
              }
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CartList;

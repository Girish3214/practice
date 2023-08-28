import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import ProductsList from "./ProductsList.jsx";
import CartList from "./CartList.jsx";

export const TYPES = {
  ADD_PRODUCTS: "ADD_PRODUCTS",
  ADD_PRODUCT_TO_CART: "ADD_PRODUCT_TO_CART",
  REMOVE_PRODUCT_FROM_CART: "REMOVE_PRODUCT_FROM_CART",
  CHANGE_QUANTITY: "CHANGE_QUANTITY",
  ADD_TOTAL_PAGES: "ADD_TOTAL_PAGES",
};
const cartReducer = (state, action) => {
  switch (action.type) {
    case TYPES.ADD_PRODUCTS:
      return {
        ...state,
        products: [...state.products, ...action.payload],
      };
    case TYPES.ADD_TOTAL_PAGES:
      return {
        ...state,
        totalPages: action.payload,
      };
    case TYPES.ADD_PRODUCT_TO_CART:
      return {
        ...state,
        cartItems: [addNewItem(action.payload), ...state.cartItems],
      };

    case TYPES.REMOVE_PRODUCT_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    case TYPES.CHANGE_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => {
          if (item.id === action.payload.id) {
            return (item.qty = action.payload.qty);
          }
          return item.qty;
        }),
      };

    default:
      break;
  }
};

const addNewItem = (item) => {
  return {
    id: item.id,
    title: item.title,
    price: item.price,
    qty: item.qty,
    thumbnail: item.thumbnail,
  };
};

function UseReducer() {
  const [state, dispatch] = useReducer(cartReducer, {
    cartItems: [],
    totalPages: 0,
    products: [],
  });
  const { products, totalPages } = state;
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    const { data } = await axios.get(
      "https://dummyjson.com/products?limit=100"
    );
    dispatch({
      type: TYPES.ADD_PRODUCTS,
      payload: [...data.products],
    });
    dispatch({
      type: TYPES.ADD_TOTAL_PAGES,
      payload: data.total,
    });
  };

  useEffect(() => {
    fetchProducts();

    return () => {};
  }, []);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <ProductsList
          products={products}
          cartItems={state.cartItems}
          dispatch={dispatch}
          page={page}
        />
        <CartList cartItems={state.cartItems} dispatch={dispatch} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: 8,
          cursor: "pointer",
        }}
      >
        {page !== 1 && (
          <div
            style={{ padding: 8, border: "1px solid grey" }}
            onClick={() => setPage((p) => p - 1)}
          >
            {"<"}
          </div>
        )}
        {totalPages > 0 &&
          Array(totalPages / 10)
            .fill()
            .map((_, i) => (
              <div
                style={{
                  padding: 8,
                  border: "1px solid grey",
                  backgroundColor: page === i + 1 ? "orange" : "",
                }}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </div>
            ))}
        {page !== totalPages / 10 && (
          <div
            style={{ padding: 8, border: "1px solid grey" }}
            onClick={() => setPage((p) => p + 1)}
          >
            {">"}
          </div>
        )}
      </div>
    </div>
  );
}

export default UseReducer;

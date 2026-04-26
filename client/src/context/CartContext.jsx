// import { createContext, useReducer, useEffect } from "react";

// export const CartContext = createContext();

// export const cartReducer = (state, action) => {
//   switch (action.type) {
//     case "SET_CART_ITEMS":
//       return {
//         cartItems: action.payload,
//       };

//     case "ADD_CART_ITEM":
//       const existing = state.cartItems.find(
//         (item) => item._id === action.payload._id,
//       );
//       if (existing) {
//         return {
//           cartItems: state.cartItems.map((item) =>
//             item._id === action.payload._id
//               ? { ...item, quantity: item.quantity + 1 }
//               : item,
//           ),
//         };
//       }
//       return {
//         cartItems: [{ ...action.payload, quantity: 1 }, ...state.cartItems],
//       };

//     case "DECREMENT_CART_ITEM":
//       return {
//         cartItems: state.cartItems
//           .map((item) =>
//             item._id === action.payload._id
//               ? { ...item, quantity: item.quantity - 1 }
//               : item,
//           )
//           .filter((item) => item.quantity > 0),
//       };

//     case "DELETE_CART_ITEM":
//       return {
//         cartItems: state.cartItems.filter(
//           (item) => item._id !== action.payload._id,
//         ),
//       };

//     default:
//       return state;
//   }
// };

// export const CartContextProvider = ({ children }) => {

//   const [state, dispatch] = useReducer(cartReducer, { cartItems: [] }, () => {    // the 3rd argument is called an Initializer function what it does is : “Hey React, before starting the app, check localStorage. If there’s a saved cart, use it. If not, start empty.”
//     try {
//       const storedCart = JSON.parse(localStorage.getItem("cart"));
//       return { cartItems: storedCart || [] };
//     } catch {
//       return { cartItems: [] };
//     }
//   });

//   //  save cart on localstorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(state.cartItems));
//   }, [state.cartItems]);

//   return (
//     <CartContext.Provider value={{ ...state, dispatch }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

import { createContext, useReducer, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const CartContext = createContext();

// REDUCER

const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART_ITEMS":
      return { cartItems: action.payload };

    case "CLEAR_CART":
      return { cartItems: [] };

    default:
      return state;
  }
};

// CONTEXT PROVIDER

export const CartContextProvider = ({ children }) => {
  const { user } = useAuthContext();

  const [state, dispatch] = useReducer(cartReducer, {
    cartItems: [],
  });

  // FETCH CART FROM BACKEND

  const fetchCart = async () => {
    if (!user) return;

    try {
      const res = await fetch("http://localhost:4000/api/cart", {
        headers: {
          Authorization: `Bearer ${user.token}`, // this token has the id inside it that way we can identify the cart items that belong to this user
        },
      });

      const data = await res.json();

      if (res.ok) {
        dispatch({ type: "SET_CART_ITEMS", payload: data });
      }
    } catch (err) {
      console.log("Cart fetch error:", err);
    }
  };

  // LOAD CART ON LOGIN / USER CHANGE

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      dispatch({ type: "CLEAR_CART" });
    }
  }, [user]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        dispatch,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

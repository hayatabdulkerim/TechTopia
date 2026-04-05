import { createContext, useReducer } from "react";

export const CartContext = createContext();

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART_ITEMS":
      return {
        cartItems: action.payload,
      };
    case "ADD_CART_ITEM":
      const existing = state.cartItems.find(
        (item) => item._id === action.payload._id,
      );
      if (existing) {
        return {
          cartItems: state.cartItems.map((item) =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }
      return {
        cartItems: [{ ...action.payload, quantity: 1 }, ...state.cartItems],
      };
    case "DECREMENT_CART_ITEM":
      return {
        cartItems: state.cartItems
          .map((item) =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          )
          .filter((item) => item.quantity > 0), // to avoid decreasing into a negative value
      };
    case "DELETE_CART_ITEM":
      return {
        cartItems: state.cartItems.filter((item) => item._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { cartItems: [] });
  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

import { createContext, useReducer, useEffect } from "react";
import { fetchAllProducts } from "../services/productServices";

export const ProductsContext = createContext();

export const productsReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };

    case "CREATE_PRODUCT":
      return {
        ...state,
        products: [action.payload, ...state.products],
      };

    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((p) => p._id !== action.payload._id),
      };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((p) =>
          p._id === action.payload._id ? action.payload : p,
        ),
      };

    default:
      return state;
  }
};

export const ProductsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, {
    products: [],
  });

  // i added this for fetching to be globaly avaliavle so that the dashboard is not dependent on the fetch that happens inside category page
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchAllProducts();
        dispatch({ type: "SET_PRODUCTS", payload: data });
      } catch (err) {
        console.error(err);
      }
    };

    loadProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductsContext.Provider>
  );
};

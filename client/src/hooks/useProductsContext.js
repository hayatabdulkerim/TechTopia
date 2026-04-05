import { useContext } from "react";
import { ProductsContext } from "../context/ProductContext";

export const useProductsContext = () => {
      const context = useContext(ProductsContext);

      if (!context) {
        // this error will be thrown when you try to access the context but you did not wrap the application with this context
        throw Error(
          "useProductsContext must be used inside a ProductsContextProvider",
        );
      }

      return context;
}

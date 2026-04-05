import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export const useCartContext = () => {
      const context = useContext(CartContext);

      if (!context) {
        // this error will be thrown when you try to access the context but you did not wrap the application with this context
        throw Error(
          "useCartContext must be used inside a CartContextProvider",
        );
      }

      return context;
}

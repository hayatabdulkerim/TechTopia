import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ProductsContextProvider } from "./context/ProductContext.jsx";
import { CartContextProvider } from "./context/CartContext.jsx";
import { AuthContextProvidor } from "./context/AuthContext.jsx";
import { UserContextProvider } from "./context/UserContext.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProductsContextProvider>
      <AuthContextProvidor>
        <CartContextProvider>
          <UserContextProvider>
            <App />
          </UserContextProvider>
        </CartContextProvider>
      </AuthContextProvidor>
    </ProductsContextProvider>
  </StrictMode>,
);

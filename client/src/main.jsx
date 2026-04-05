import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ProductsContextProvider } from './context/ProductContext.jsx';
import { CartContextProvider } from './context/CartContext.jsx';
import App from "./App.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProductsContextProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </ProductsContextProvider>
  </StrictMode>,
);

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ProductsContextProvider } from './context/ProductContext.jsx';
import App from './App.jsx'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProductsContextProvider>
      <App />
    </ProductsContextProvider>
  </StrictMode>
);

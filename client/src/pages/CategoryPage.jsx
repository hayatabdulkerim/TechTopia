import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ProductDetail from "../components/ProductDetail";
import { useProductsContext } from "../hooks/useProductsContext";

export default function CategoryPage() {
    const { name } = useParams();
  const { products, dispatch } = useProductsContext();
  useEffect(() => {
    const fetchProducts = async () => {
      // for us to be able to use async
      const response = await fetch("http://localhost:4000/api/products");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_PRODUCTS", payload: json });
      }
    };

    fetchProducts();
  }, [dispatch]);

  const filteredProducts = name
    ? products.filter((p) => p.category === name)
    : [];

  return (
    <div className="container mt-4">
      <div className="row">
        {filteredProducts &&
          filteredProducts.map((product) => (
            <div className="col-md-4" key={product._id}>
              <ProductDetail product={product} />
            </div>
          ))}
      </div>
    </div>
  );
}

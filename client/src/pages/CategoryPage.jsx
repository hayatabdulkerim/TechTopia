import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductDetail from "../components/ProductDetail";
import { useProductsContext } from "../hooks/useProductsContext";

export default function CategoryPage() {
  const { name } = useParams();
  const [searchText, setSearchText] = useState("");
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

  const match = filteredProducts.filter((p) =>
    p.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <div className="container mt-4">
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid justify-content-center">
          <form
            className="d-flex"
            role="search"
            style={{ width: "500px", maxWidth: "90%" }}
          >
            <input
              type="search"
              className="form-control"
              placeholder="Search name of a product"
              aria-label="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </form>
        </div>
      </nav>

      <div className="row">
        {match.length > 0 ? (
          match.map((product) => (
            <div className="col-md-4" key={product._id}>
              <ProductDetail product={product} />
            </div>
          ))
        ) : (
          <h3 className="text-center mt-4">No products with this name</h3>
        )}
      </div>
    </div>
  );
}

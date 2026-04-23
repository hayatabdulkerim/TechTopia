import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductsContext } from "../hooks/useProductsContext";
import ProductDetail from "../components/ProductDetail";

export default function CategoryPage() {
  const { name } = useParams();
  const [searchText, setSearchText] = useState("");
  const { products } = useProductsContext();

  //  since i made the fetching happen in the product context rather than here i dont need to fetch and dispatch the products here
  if (!products) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  // filter by category
  const filteredProducts = products.filter((p) => p.category === name);

  const match = filteredProducts.filter((p) =>
    p.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <div className="container mt-4 ">
      <nav className="navbar searchbar">
        <div className="container-fluid justify-content-center ">
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



import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductsContext } from "../hooks/useProductsContext";
import ProductDetail from "../components/ProductDetail";

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
  }, [dispatch]); // to make sure we are dealing with the latest products

  const filteredProducts = name
    ? products.filter((p) => p.category === name)
    : [];

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


// fetching only the selected category (avoiding client side filtering)


// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useProductsContext } from "../hooks/useProductsContext";
// import ProductDetail from "../components/ProductDetail";

// export default function CategoryPage() {
//   const { name } = useParams();
//   const [searchText, setSearchText] = useState("");
//   const [loading, setLoading] = useState(true);
//   const { products, dispatch } = useProductsContext();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true); // show loading while fetching
//       try {
//         // Fetch only products in the current category
//         const response = await fetch(
//           `http://localhost:4000/api/products?category=${name}`,
//         );
//         const json = await response.json();

//         if (response.ok) {
//           dispatch({ type: "SET_PRODUCTS", payload: json });
//         }
//       } catch (error) {
//         console.error("Failed to fetch products:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [dispatch, name]); // re-run whenever category changes

//   // Filter products by search text
//   const match = products.filter((p) =>
//     p.name.toLowerCase().includes(searchText.toLowerCase()),
//   );

//   return (
//     <div className="container mt-4">
//       {/* Search Bar */}
//       <nav className="navbar searchbar">
//         <div className="container-fluid justify-content-center">
//           <form
//             className="d-flex"
//             role="search"
//             style={{ width: "500px", maxWidth: "90%" }}
//           >
//             <input
//               type="search"
//               className="form-control"
//               placeholder="Search product"
//               aria-label={`Search products in ${name}`}
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//             />
//           </form>
//         </div>
//       </nav>

//       {/* Product Grid */}
//       <div className="row mt-4">
//         {loading ? (
//           <div className="text-center w-100">Loading...</div>
//         ) : match.length > 0 ? (
//           match.map((product) => (
//             <div className="col-12 col-sm-6 col-md-4 mb-4" key={product._id}>
//               <ProductDetail product={product} />
//             </div>
//           ))
//         ) : (
//           <h3 className="text-center mt-4">No products with this name</h3>
//         )}
//       </div>
//     </div>
//   );
// }
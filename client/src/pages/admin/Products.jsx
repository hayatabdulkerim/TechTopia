import { useProductsContext } from "../../hooks/useProductsContext";

const Products = () => {
  const { products } = useProductsContext();

  return (
    <div className="container mt-4">
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h5 className="mb-3">All Products</h5>

          <div className="table-responsive">
            <table className="table table-hover align-middle">
              {/* Table Head */}
              <thead className="table-light">
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {products && products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product._id}>
                      {/* Product (Image + Name) */}
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={product.image}
                            // alt={product.name}
                            className="rounded me-2"
                            style={{
                              width: "45px",
                              height: "45px",
                              objectFit: "cover",
                            }}
                          />
                          <span>{product.name}</span>
                        </div>
                      </td>

                      {/* Category */}
                      <td>{product.category}</td>

                      {/* Price */}
                      <td>${product.price}</td>

                      {/* Stock */}
                      <td>
                        <span
                          className={`badge ${
                            product.stock > 0 ? "bg-success" : "bg-danger"
                          }`}
                        >
                          {product.stock > 0 ? product.stock : "Out of stock"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="text-center">
                        <button className="btn btn-sm btn-primary me-2">
                          Edit
                        </button>
                        <button className="btn btn-sm btn-danger">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted">
                      No products available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;

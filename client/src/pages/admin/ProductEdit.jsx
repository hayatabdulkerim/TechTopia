
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductsContext } from "../../hooks/useProductsContext";


export default function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useProductsContext();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [stock, setStock] = useState("");

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  // Fetch product by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/products/${id}`);

        const data = await res.json();

        if (!res.ok) {
          setError(data.error);
          setFetchLoading(false);
          return;
        }

        setName(data.name);
        setCategory(data.category);
        setDescription(data.description);
        setPrice(data.price);
        setStock(data.stock);
        setImageLink(data.imageLink);

        setFetchLoading(false);
      } catch (err) {
        setError("Failed to load product");
        setFetchLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  //  Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedProduct = {
      name,
      category,
      description,
      price,
      stock,
      imageLink,
    };

    try {
      const res = await fetch(`http://localhost:4000/api/products/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields || []);
      } else {
        dispatch({ type: "UPDATE_PRODUCT", payload: json });
        navigate("/products");
      }
    } catch (err) {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  //  Loading state
  if (fetchLoading) {
    return <div className="container topmar">Loading product...</div>;
  }

  return (
    <div className="container topmar">
      <h1 className="mb-4">Edit Product</h1>

      <form
        onSubmit={handleSubmit}
        className="card p-4 shadow-sm bg-light rounded"
      >
        {/* Name */}
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className={`form-control ${
              emptyFields.includes("name") ? "error" : ""
            }`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Category */}
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className={`form-control ${
              emptyFields.includes("category") ? "error" : ""
            }`}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            <option value="headsets">Headsets</option>
            <option value="earbuds">Earbuds</option>
            <option value="smart-glasses">Smart Glasses</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className={`form-control ${
              emptyFields.includes("description") ? "error" : ""
            }`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Price */}
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className={`form-control ${
              emptyFields.includes("price") ? "error" : ""
            }`}
            value={price}
            onChange={(e) =>
              setPrice(e.target.value === "" ? "" : Number(e.target.value))
            }
          />
        </div>

        {/* Stock */}
        <div className="mb-3">
          <label className="form-label">Stock</label>
          <input
            type="number"
            className={`form-control ${
              emptyFields.includes("stock") ? "error" : ""
            }`}
            value={stock}
            onChange={(e) =>
              setStock(e.target.value === "" ? "" : Number(e.target.value))
            }
          />
        </div>

        {/* Image */}
        <div className="mb-3">
          <label className="form-label">Image Link</label>
          <input
            type="text"
            className={`form-control ${
              emptyFields.includes("imageLink") ? "error" : ""
            }`}
            value={imageLink}
            onChange={(e) => setImageLink(e.target.value)}
          />
        </div>

        {/* Error */}
        {error && <div className="alert alert-danger">{error}</div>}

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Saving..." : "Save changes"}
        </button>
      </form>
    </div>
  );
}
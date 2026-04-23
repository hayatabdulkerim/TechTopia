import { useState } from "react";
import { useProductsContext } from "../hooks/useProductsContext";

export default function ProductForm() {
  const { dispatch } = useProductsContext();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [stock, setStock] = useState("");

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      category,
      description,
      price,
      stock,
      imageLink,
    };

    const response = await fetch("http://localhost:4000/api/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields || []);
    } else {
      setError(null);
      setEmptyFields([]);

      setName("");
      setCategory("");
      setDescription("");
      setPrice("");
      setStock("");
      setImageLink("");

      

      dispatch({ type: "CREATE_PRODUCT", payload: json });
    }
  };

  return (
    <div className="container topmar">
      <h1 className="mb-4">Add a Product</h1>

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
            <option value="headphones">Headphones</option>
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
            onChange={(e) => setPrice(e.target.value)}
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
            onChange={(e) => setStock(e.target.value)}
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

        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </form>
    </div>
  );
}

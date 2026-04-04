import { useState } from "react";
import { useProductsContext } from "../hooks/useProductsContext";

export default function ProductForm() {
  const { dispatch } = useProductsContext();

  const [name, setname] = useState("");
  const [category, setcategory] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [imageLink, setimageLink] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = { name, category, description, price, imageLink };

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
      setEmptyFields(json.emptyFields);
    } else {
      setError(null);
      setEmptyFields([]);
      setname("");
      setcategory("");
      setdescription("");
      setprice("");
      setimageLink("");

      console.log("new product added", json);
      dispatch({ type: "CREATE_PRODUCT", payload: json });
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Add a Product</h1>
      <form
        onSubmit={handleSubmit}
        className="card p-4 shadow-sm bg-light rounded"
      >
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Product Name
          </label>
          <input
            id="name"
            type="text"
            className={`form-control ${emptyFields.includes("name") ? "error" : ""}`}
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            id="category"
            className={`form-control ${emptyFields.includes("category") ? "error" : ""}`}
            value={category}
            onChange={(e) => setcategory(e.target.value)}
          >
            <option value="">Select a category</option>{" "}
            <option value="headphones">Headphones</option>
            <option value="earbuds">Earbuds</option>
            <option value="smart glasses">Smart Glasses</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            className={`form-control ${emptyFields.includes("description") ? "error" : ""}`}
            value={description}
            onChange={(e) => setdescription(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            id="price"
            type="number"
            className={`form-control ${emptyFields.includes("price") ? "error" : ""}`}
            value={price}
            onChange={(e) => setprice(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="imageLink" className="form-label">
            Image Link
          </label>
          <input
            id="imageLink"
            type="text"
            className={`form-control ${emptyFields.includes("imageLink") ? "error" : ""}`}
            value={imageLink}
            onChange={(e) => setimageLink(e.target.value)}
          />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </form>
    </div>
  );
}

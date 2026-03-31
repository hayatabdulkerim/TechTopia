import { useState, useReducer } from "react";
import { useProductsContext } from "../hooks/useProductsContext";

export default function ProductForm() {
  const { dispatch: productsDispatch } = useProductsContext();

  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([]);

  const formReducer = (state, action) => ({ ...state, ...action });

  const [state, dispatch] = useReducer(formReducer, {
    name: "",
    category: "",
    description: "",
    price: "",
    imageLink: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, category, description, price, imageLink } = state;
    const product = { name, category, description, price, imageLink };

    const response = await fetch("http://localhost:4000/api/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
  "Content-Type": "application/json"
}
    });

    const json = await response.json()

    if (!response.ok){
        setError(json.error);
        setEmptyFields(json.emptyFields);
    }
    if(response.ok){
        setError(null)
        setEmptyFields([]);
         dispatch({
           name: "",
           category: "",
           description: "",
           price: "",
           imageLink: "",
         });

        console.log('new product added', json)
        productsDispatch({type: "CREATE_PRODUCT", payload: json})
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add a product</h1>

      <label htmlFor="name">Product Name</label>
      <input
        id="name"
        type="text"
        value={state.name}
        onChange={(e) => dispatch({ name: e.target.value })}
      />
      <br />
      <label htmlFor="category">Category</label>
      <input
        id="category"
        type="text"
        value={state.category}
        onChange={(e) => dispatch({ category: e.target.value })}
      />
      <br />

      <label htmlFor="description">Description</label>
      <input
        id="description"
        type="text"
        value={state.description}
        onChange={(e) => dispatch({ description: e.target.value })}
      />
      <br />

      <label htmlFor="price">Price</label>
      <input
        id="price"
        type="number"
        value={state.price}
        onChange={(e) => dispatch({ price: e.target.value })}
      />
      <br />

      <label htmlFor="imageLink">Image Link</label>
      <input
        id="imageLink"
        type="text"
        value={state.imageLink}
        onChange={(e) => dispatch({ imageLink: e.target.value })}
      />
      <br />

      <button>Add Product</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}


export default function ProductDetail({ product }) { // reciving product as a prop from categoryPage
  return (
    <div className="card shadow-sm m-3" style={{ width: "18rem" }}>
      <img
        src={product.imageLink}
        className="card-img-top"
        alt={product.name}
        style={{ height: "180px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <h6 className="text-success fw-bold">${product.price}</h6>
        <button className="btn btn-primary w-100 mt-2">Add to Cart</button>
      </div>
    </div>
  );
}
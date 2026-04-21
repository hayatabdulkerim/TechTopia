
// import { useCartContext } from "../hooks/useCartContext";
// import { useAuthContext } from "../hooks/useAuthContext";
// import { useNavigate } from "react-router-dom";

// export default function ProductDetail({ product }) {
//   const { dispatch } = useCartContext();
//   const { user } = useAuthContext();
//   const navigate = useNavigate();

//   const handleAddToCart = () => {
//     //  CHECK LOGIN FIRST
//     if (!user) {
//       navigate("/login");
//       return;
//     }

//     dispatch({
//       type: "ADD_CART_ITEM",
//       payload: product,
//     });
//   };

//   return (
//     <div className="card shadow-sm m-3" style={{ width: "18rem" }}>
//       <img
//         src={product.imageLink}
//         className="card-img-top"
//         alt={product.name}
//         style={{ height: "180px", objectFit: "cover" }}
//       />

//       <div className="card-body">
//         <h5 className="card-title">{product.name}</h5>
//         <p className="card-text">{product.description}</p>
//         <h6 className="text-success fw-bold">${product.price}</h6>

//         <button
//           className="btn btn-primary w-100 mt-2"
//           onClick={handleAddToCart}
//         >
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// }
import { useCartContext } from "../hooks/useCartContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

export default function ProductDetail({ product }) {
  const { fetchCart } = useCartContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  // ADD TO CART (backend source of truth)

  const handleAddToCart = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      await fetch("http://localhost:4000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          productId: product._id,
        }),
      });

      // refresh cart from backend
      await fetchCart();
    } catch (error) {
      console.log("Add to cart error:", error);
    }
  };

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

        <button
          className="btn btn-primary w-100 mt-2"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
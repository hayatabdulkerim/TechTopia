// import { useCartContext } from "../hooks/useCartContext";

// export default function CartItem({cartItem}) {

//   const {dispatch} = useCartContext();

//   return (
//     <>
//       <div className="d-flex mb-3">
//         <img
//           src={cartItem.productId.imageLink}
//           className="me-3 rounded"
//           width="60"
//         />
//         <div className="flex-grow-1">
//           <h6 className="mb-1">{cartItem.productId.name}</h6>
//           <small className="text-muted">
//             {cartItem.quantity} × ${cartItem.productId.price}
//           </small>
//         </div>
//         <button
//           className="btn btn-sm btn-outline-danger"
//           onClick={() =>
//             dispatch({ type: "DELETE_CART_ITEM", payload: cartItem })
//           }
//         >
//           ×
//         </button>
//         <button
//           className="btn btn-sm btn-outline-danger"
//           onClick={() =>
//             dispatch({ type: "DECREMENT_CART_ITEM", payload: cartItem })
//           }
//         >
//           -
//         </button>
//       </div>
//       <hr />
//     </>
//   );
// }

import { useCartContext } from "../hooks/useCartContext";
import { useAuthContext } from "../hooks/useAuthContext";

export default function CartItem({ cartItem }) {
  const { fetchCart } = useCartContext();
  const { user } = useAuthContext();

  // ------------------------
  // DELETE ITEM
  // ------------------------
  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:4000/api/cart/${cartItem._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      await fetchCart(); // sync with backend
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  // ------------------------
  // DECREMENT ITEM
  // ------------------------
  const handleDecrement = async () => {
    try {
      await fetch(`http://localhost:4000/api/cart/${cartItem._id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      await fetchCart(); // sync with backend
    } catch (err) {
      console.log("Decrement error:", err);
    }
  };

  return (
    <>
      <div className="d-flex mb-3">
        <img
          src={cartItem.productId.imageLink}
          className="me-3 rounded"
          width="60"
        />

        <div className="flex-grow-1">
          <h6 className="mb-1">{cartItem.productId.name}</h6>

          <small className="text-muted">
            {cartItem.quantity} × ${cartItem.productId.price}
          </small>
        </div>

        {/* DELETE */}
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={handleDelete}
        >
          ×
        </button>

        {/* DECREMENT */}
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={handleDecrement}
        >
          -
        </button>
      </div>

      <hr />
    </>
  );
}
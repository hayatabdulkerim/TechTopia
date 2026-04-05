import { useCartContext } from "../hooks/useCartContext";

export default function CartItem({cartItem}) {

  const {dispatch} = useCartContext();

  return (
    <>
      <div className="d-flex mb-3">
        <img src={cartItem.imageLink} className="me-3 rounded" width="60" />
        <div className="flex-grow-1">
          <h6 className="mb-1">{cartItem.name}</h6>
          <small className="text-muted">
            {cartItem.quantity} × ${cartItem.price}
          </small>
        </div>
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={() =>
            dispatch({ type: "DELETE_CART_ITEM", payload: cartItem })
          }
        >
          ×
        </button>
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={() =>
            dispatch({ type: "DECREMENT_CART_ITEM", payload: cartItem })
          }
        >
          -
        </button>
      </div>
      <hr />
    </>
  );
}

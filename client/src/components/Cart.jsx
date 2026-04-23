import CartItem from "./CartItem";
import { useCartContext } from "../hooks/useCartContext";

export default function Cart({ onClose }) {
  // <-- receive onClose from Navbar
  const { cartItems } = useCartContext();

  // const subtotal = cartItems.reduce(
  //   (total, item) => total + item.price * item.quantity,
  //   0,
  // );
const subtotal = cartItems.reduce(
  (total, item) => total + (item.productId?.price || 0) * item.quantity,
  0,
);

  return (
    // Use a div with Bootstrap classes but React-controlled
    <div
      className="offcanvas offcanvas-end show"
      style={{
        visibility: "visible",
        transform: "translateX(0)",
        width: "350px", // adjust width as needed
        backgroundColor: "white",
        zIndex: 1055,
        position: "fixed",
        top: 0,
        bottom: 0,
        right: 0,
        overflowY: "auto",
      }}
    >
      <div className="offcanvas-header border-bottom">
        <h5 className="offcanvas-title">Cart</h5>
        <button
          type="button"
          className="btn-close"
          onClick={onClose} // React close
        ></button>
      </div>

      <div className="offcanvas-body d-flex flex-column">
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem._id} cartItem={cartItem} />
          ))
        )}

        <div className="mt-auto">
          <div className="d-flex justify-content-between mb-3">
            <strong>Total</strong>
            <strong>${subtotal}</strong>
          </div>

          <button
            className="btn btn-primary w-100 mb-2 rounded-pill "
            disabled={cartItems.length === 0}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

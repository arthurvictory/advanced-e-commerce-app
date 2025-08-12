import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../features/cart/cartSlice";

const CartItems = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="d-flex flex-column align-items-center shadow gap-3 col-md-2 p-3">
      <h1>Cart:</h1>
      {cart.map((item) => (
        <div key={item.id}>
          <img src={item.image} alt={item.title} className="w-25" />
          <p>
            {item.title} - Qty: {item.quantity}
          </p>
          <button onClick={() => dispatch(removeFromCart(item.id))}>
            Remove from cart
          </button>
          <button
            onClick={() =>
              dispatch(
                updateQuantity({ id: item.id, quantity: item.quantity + 1 })
              )
            }
          >
            +1
          </button>
        </div>
      ))}
      <button onClick={() => dispatch(clearCart())}>Clear the cart</button>
    </div>
  );
};

export default CartItems;

import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
  selectCartItems,
  selectTotalQuantity,
  selectTotalPrice
} from "../features/cart/cartSlice";

const CartItems = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  
  const shoppingCart = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectTotalQuantity);
  const totalPrice = useSelector(selectTotalPrice);
  
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <div className="d-flex flex-row align-items-center">
        <h1>Shopping Cart:</h1>
        {cart.map((item) => (
          <div key={item.id}>
            <img src={item.image} alt={item.title} className="w-25" />
            <p>{item.price}</p>
            <p>
              {item.title} - Qty: {item.quantity}
            </p>
            <button
              onClick={() =>
                dispatch(
                  updateQuantity({ id: item.id, quantity: item.quantity - 1 })
                )
              }
            >
              {" "}
              -{" "}
            </button>
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
              {" "}
              +{" "}
            </button>
          </div>
        ))}
        <button onClick={() => dispatch(clearCart())}>Clear the cart</button>
      </div>
      <div>
        <h2>Total items:</h2>
        <p>{totalQuantity}</p>
        <h2>Total price:</h2>
        <p>${totalPrice.toFixed(2)}</p>

        {shoppingCart.map((item) => (
          <div key={item.id}>
            <p>
              {item.id} — Qty: {item.quantity} — ${item.price}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default CartItems;

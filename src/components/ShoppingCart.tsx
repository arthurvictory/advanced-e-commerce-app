import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";
import CheckoutButton from "../pages/Checkout";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
  selectCartItems,
  selectTotalQuantity,
  selectTotalPrice
} from "../features/cart/cartSlice";
import { Row, Col, Button, Card } from "react-bootstrap";


// Cartslice reference and useSelector to update the Shopping Cart
const CartItems = () => {
  const cart = useSelector((state: RootState) => state.cart.items);

  const shoppingCart = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectTotalQuantity);
  const totalPrice = useSelector(selectTotalPrice);

  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="m-5">
      <Row>
        {/* Left Column: Cart Items */}
        <Col md={6}>
          <Card border="dark">
            <Card.Body>
              <h1>Shopping Cart:</h1>
              {cart.map((product) => (
                <div key={product.id} className="mb-3">
                  <Card.Img
                    variant="top"
                    src={product.image}
                    alt={product.title}
                    className="w-25 mb-2"
                  />
                  <Card.Title>
                    <p>
                      {product.title} - Qty: {product.quantity}
                    </p>
                  </Card.Title>
                  <Card.Subtitle>
                    <p>${product.price}</p>
                  </Card.Subtitle>
                  <div className="d-flex gap-2">
                    <Button
                      variant="secondary"
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: product.id,
                            quantity: product.quantity - 1,
                          })
                        )
                      }
                    >
                      -
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => dispatch(removeFromCart(product.id))}
                    >
                      Remove
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: product.id,
                            quantity: product.quantity + 1,
                          })
                        )
                      }
                    >
                      +
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="danger" onClick={() => dispatch(clearCart())}>
                Clear the cart
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Right Column: Summary */}
        <Col md={6}>
          <h2>Total items:</h2>
          <p>{totalQuantity}</p>
          <h2>Total price:</h2>
          <p>${totalPrice.toFixed(2)}</p>

          <h4>Cart Breakdown:</h4>
          {shoppingCart.map((product) => (
            <div key={product.id}>
              <p>
                {product.id} — Qty: {product.quantity} — ${product.price}
              </p>
            </div>
          ))}
          <CheckoutButton />
        </Col>
      </Row>
    </div>
  );
};


export default CartItems;

import type { Product } from "../types/type"
import { Rating } from "@smastrom/react-rating";
import { addToCart } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../app/store";
import { Button, Card } from "react-bootstrap";

const ProductCard:React.FC<{product: Product}> = ({product}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({ ...product, quantity: 1}))
  }

  return (
    <>
      <div className="align-items-center gap-3 col-md-3 p-3">
        <Card className="justify-content-center align-items-center p-1" border="light" style={{  width: "25rem" }}>
          <Card.Img
            variant="top"
            src={product.image}
            alt={product.title}
            className="w-25"
          />
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Subtitle className="mb-2">Price: ${product.price}</Card.Subtitle>
            <h5>{product.category.toUpperCase()}</h5>
            <Rating
              style={{ maxWidth: 100 }}
              value={product.rating.rate}
              readOnly
            />
            <Card.Text>{product.description}</Card.Text>
            <Button
              variant="secondary"
              onClick={() => handleAddToCart(product)}
            >
              Add to cart
            </Button>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default ProductCard
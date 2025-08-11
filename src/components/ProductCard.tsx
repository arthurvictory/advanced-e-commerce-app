import type { Product } from "../types/type"
import { Rating } from "@smastrom/react-rating";

const ProductCard:React.FC<{product: Product}> = ({product}) => {
  return (
    <div className="d-flex flex-column align-items-center shadow gap-3 col-md-2 p-3">
      <h3>{product.title}</h3>
      <img src={product.image} alt={product.title} className="w-25" />
      <p>Price: ${product.price}</p>
      <h5>{product.category.toUpperCase()}</h5>
      <Rating style={{ maxWidth: 100 }} value={product.rating.rate} readOnly />
      <p>Description: {product.description}</p>
    </div>
  );
}

export default ProductCard
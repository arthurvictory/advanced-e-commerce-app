import { useEffect } from "react";
import type { Category, Product } from "../types/type";
import ProductCard from "../components/ProductCard";
import { useProductContext } from "../context/ProductContext";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchCategories } from "../api/fakestoreAPI";
import { Form } from "react-bootstrap";

const Home: React.FC = () => {
  const {products, dispatch, selectedCategory} = useProductContext();

  const { data: productsData, isLoading } = useQuery({
    queryKey:['products'],
    queryFn: fetchProducts,
  })

  useEffect(() => {
    if (productsData)
    dispatch({ type: "SET_PRODUCTS", payload: productsData?.data });
  }, [dispatch, productsData])

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const getFilteredProducts = () => {
    if(selectedCategory){
      return products.filter((product:Product) => product.category === selectedCategory);
    }
    return products;
  }

  const filteredProducts = getFilteredProducts();

  return (
      <div className="d-flex flex-wrap justify-content-center p-3 gap-3">
        <Form.Select
          style={{ width: "500px" }}
          onChange={(e) =>
            dispatch({ type: "SET_SELECTED_CATEGORY", payload: e.target.value })
          }
        >
          <option value="">All Categories</option>
          {categories?.data.map((category: Category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </Form.Select>
        {isLoading && <h1>Loading...</h1>}
        <div className="d-flex flex-wrap justify-content-center gap-3">
          {filteredProducts.map((product: Product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
  );
};
export default Home;

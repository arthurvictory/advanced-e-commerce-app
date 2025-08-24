import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavigationBar from "./components/Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProductProvider } from "./context/ProductContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CartItems from "./components/ShoppingCart";
import ThankYou from "./pages/ThankYou";

function App() {
  const client = new QueryClient()
  return (
    <QueryClientProvider client={client}>
      <ProductProvider>
        <BrowserRouter>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<CartItems />} />
            <Route path="/thank-you" element={<ThankYou />} />
          </Routes>
        </BrowserRouter>
      </ProductProvider>
    </QueryClientProvider>
  );
}

export default App;

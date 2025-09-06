import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavigationBar from "./components/Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProductProvider } from "./context/ProductContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CartItems from "./components/ShoppingCart";
import ThankYou from "./pages/ThankYou";
import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "./firebaseConfig";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const client = new QueryClient();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <QueryClientProvider client={client}>
      <ProductProvider>
        <BrowserRouter>
          <NavigationBar />
          {user ? (
            <>
              <h2 className="text-center mt-3">Welcome, {user.email}</h2>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<CartItems />} />
                <Route path="/thank-you" element={<ThankYou />} />
              </Routes>
              <Login /> {/* Use this for logout functionality */}
            </>
          ) : (
            <div className="container mt-4">
              <Register />
              <Login />
            </div>
          )}
        </BrowserRouter>
      </ProductProvider>
    </QueryClientProvider>
  );
}


export default App;

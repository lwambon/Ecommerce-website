import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Home from "./pages/Home/Home";

import Cart from "./pages/Cart/Cart";
import Profile from "./pages/Profile/Profile";
import Products from "./pages/Products/Products";
import Logout from "./pages/Logout/Logout";
import Login from "./components/Login/Login";
import Sign from "./components/Sign/Sign";
import ShopCategory from "./pages/ShopCategory/ShopCategory";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import men_banner from "./assets/MensBanner.jpg";
import women_banner from "./assets/Womenbanner.jpg";
import kids_banner from "./assets/KidsBanner.jpg";

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<Products />} />
          <Route
            path="/men"
            element={<ShopCategory banner={men_banner} ProductCategory="Men" />}
          />
          <Route
            path="/ladies"
            element={
              <ShopCategory banner={women_banner} ProductCategory="Women" />
            }
          />
          <Route
            path="/kids"
            element={
              <ShopCategory banner={kids_banner} ProductCategory="Kids" />
            }
          />
          <Route path="/logout" element={<Logout />} />
          <Route path="/sign up" element={<Sign />} />
          <Route path="/login" element={<Login />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

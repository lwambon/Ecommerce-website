import "./App.css";
import { useLocation } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Home from "./pages/Home/Home";
import Login from "./components/Login/Login";
import Sign from "./components/Sign/Sign";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Products from "./pages/Products/Products";
import Fragrance from "./pages/Fragrance/Fragrance";
import Beauty from "./pages/Beauty/Beauty";
import Profile from "./pages/Profile/Profile";
import Furniture from "./pages/Furniture/Furniture";
import Groceries from "./pages/Groceries/Groceries";
import Cart from "./pages/Cart/Cart";

const client = new QueryClient();

function Main() {
  const location = useLocation();
  return (
    <>
      {!location.pathname.startsWith("/products") &&
        location.pathname !== "/fragrance" &&
        location.pathname !== "/beauty" &&
        location.pathname !== "/furniture" &&
        location.pathname !== "/groceries" &&
        location.pathname !== "/cart" &&
        location.pathname !== "/profile" && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/fragrance" element={<Fragrance />} />
        <Route path="/beauty" element={<Beauty />} />
        <Route path="/furniture" element={<Furniture />} />
        <Route path="/groceries" element={<Groceries />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/sign up" element={<Sign />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Main />
        <Footer />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

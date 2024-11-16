// App.js
import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
import Logout from "./pages/Logout/Logout";
import Products from "./pages/Products/Products";
import Login from "./components/Login/Login";
import Sign from "./components/Sign/Sign";

//const client = new QueryClient();

function Main() {
  const location = useLocation();
  return (
    <>
      {!location.pathname.startsWith("/product") &&
        location.pathname !== "/cart" &&
        location.pathname !== "/contact" &&
        location.pathname !== "/product" &&
        location.pathname !== "/logout" && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product" element={<Products />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/sign up" element={<Sign />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}
function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      {/* <Navbar/> */}
      <Main />
    </BrowserRouter>
  );
}

export default App;

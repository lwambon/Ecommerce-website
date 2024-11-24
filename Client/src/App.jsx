import "./App.css";
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
import Furniture from "./pages/Furniture/Furniture";
import Groceries from "./pages/Groceries/Groceries";

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/fragrance" element={<Fragrance />} />
          <Route path="/beauty" element={<Beauty />} />
          <Route path="/furniture" element={<Furniture />} />
          <Route path="/groceries" element={<Groceries />} />
          <Route path="/sign up" element={<Sign />} />
          <Route path="/login" element={<Login />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

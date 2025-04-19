import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Menu from "./pages/Menu";
import { Home } from "./pages/Home";
import Navbar from "./components/layout/Navbar";
import About from "./components/AboutUs";
import Contact from "./components/Contact";
import BookTable from "./components/BookATable";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/reservations" element={<BookTable/>} />
        <Route path="/cart" element={<div>Cart</div>} />
        <Route path="/order" element={<div>Order</div>} />
        <Route path="/order/:id" element={<div>Order Details</div>} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
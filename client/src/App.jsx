import { BrowserRouter, Routes, Route} from "react-router-dom";
// Importing Bootstrap CSS & JS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// Importing custom css
import "./App.css";

// Importing pages and components
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CategoryPage from "./pages/CategoryPage";
import Navbar from "./components/Navbar";
import ProductForm from "./components/ProductForm"


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:name" element={<CategoryPage />} />
        {/* <Route path="/login" element={<ProductForm />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;

// best practices 
// use an outlet when you add footer
// consider lazy loading
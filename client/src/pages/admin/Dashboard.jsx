import { useState } from "react";
import { useProductsContext } from "../../hooks/useProductsContext";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };



  // products 

  const {products} = useProductsContext();

  return (
    <div className="d-flex topmar">
      {/* Sidebar */}
      <div
        className={`bg-dark text-white p-3 ${
          isSidebarOpen ? "d-block" : "d-none"
        }`}
        style={{ width: "250px", minHeight: "100vh" }}
      >
        <h4>TechTopia</h4>
        <hr />

        <ul className="nav flex-column">
          <li className="nav-item">
            <a href="#" className="nav-link text-white">
              Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a href="/products" className="nav-link text-white">
              Products
            </a>
          </li>
          <li className="nav-item">
            <a href="/add_product" className="nav-link text-white">
              Add Product
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-white">
              Users
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1">
        {/* Navbar */}
        <nav className="navbar navbar-light bg-light border-bottom px-3">
          <button className="btn btn-outline-dark" onClick={toggleSidebar}>
            ☰
          </button>

          <span className="ms-3 fw-bold">Admin Dashboard</span>

          <div className="ms-auto">
            <span>Admin</span>
          </div>
        </nav>

        {/* Page Content */}
        <div className="p-4">

          <div className="container mt-4">
            <div className="row">
              <div className="col-md-4">
                <div className="card shadow-sm border-0">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-muted mb-1">Total Products</h6>
                      <h3 className="mb-0">{products?.length || 0}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

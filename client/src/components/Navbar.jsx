export default function Navbar() {
  return (
    <>
      <nav
        className="navbar bg-dark border-bottom border-body  p-3"
        data-bs-theme="dark"
      >
        <a className="navbar-brand me-1" href="/">
          TechTopia
        </a>
        <div className="container-fluid d-inline-block w-75 d-flex justify-content-evenly ms-1 ">
          <a className="navbar-brand " href="/headphones">
            Headphones
          </a>
          <a className="navbar-brand" href="/earbuds">
            Earbuds
          </a>
          <a className="navbar-brand" href="/smartglasses">
            Smart glasses
          </a>
          <a className="navbar-brand" href="/accessories">
            Accessories
          </a>
          <button className="btn btn-outline-light align-self-end">Login</button>
          <button className="btn btn-light text-dark align-self-end">Signup</button>
        </div>
      </nav>
    </>
  );
}

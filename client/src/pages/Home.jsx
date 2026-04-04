import React from "react";

// Banner component
function Banner() {
  return (
    <div className="bg-primary text-white text-center py-5">
      <h1 className="display-4">Welcome to TechTopia</h1>
      <p className="lead">Your one-stop shop for the latest tech gadgets</p>
      <a href="#categories" className="btn btn-light btn-lg mt-3">
        Explore Categories
      </a>
    </div>
  );
}

// Footer component
function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-5">
      <p className="mb-0">&copy; 2026 TechTopia. All rights reserved.</p>
    </footer>
  );
}

// Home page
export default function Home() {
  return (
    <>
      <Banner />

      {/* Optional middle section */}
      <div className="container my-5 text-center">
        <p>Select a category from the navbar to view products!</p>
      </div>

      <Footer />
    </>
  );
}

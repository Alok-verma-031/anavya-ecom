import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <header className="main-navbar">
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            {/* Brand logo */}
            <a className="navbar-brand" href="#home" aria-label="ANAVAYA home">
              <span className="brand-mark">
                <span>A</span>
              </span>
              <span>
                <span className="brand-name">ANAVAYA</span>
                <span className="brand-tagline">Elegance in Every Choice</span>
              </span>
            </a>
            {/* Mobile menu toggle */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#mainMenu"
              aria-controls="mainMenu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            {/* Navigation links */}
            <div className="collapse navbar-collapse" id="mainMenu">
              <ul className="navbar-nav mx-auto align-items-lg-center">
                <li className="nav-item">
                  <a className="nav-link active" href="#home">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#trending">
                    Shop
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#categories">
                    Categories
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#new-arrivals">
                    New Arrivals
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#about">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#footer">
                    Contact
                  </a>
                </li>
              </ul>
              {/* Search and shopping actions */}
              <div className="navbar-actions d-flex align-items-center justify-content-center gap-2">
                <form className="d-flex me-lg-2" role="search" id="searchForm">
                  <input
                    className="form-control form-control-sm rounded-pill"
                    id="productSearch"
                    type="search"
                    placeholder="Search products..."
                    aria-label="Search products"
                  />
                </form>
                <Link className="nav-icon" to={"/login"} aria-label="Account">
                  <i className="bi bi-person" />
                </Link>
                <button
                  className="nav-icon"
                  type="button"
                  aria-label="Wishlist"
                >
                  <i className="bi bi-heart" />
                </button>
                <a
                  className="nav-icon position-relative"
                  href="#trending"
                  aria-label="Shopping cart"
                >
                  <i className="bi bi-bag" />
                  <span className="cart-count" id="cartCount">
                    0
                  </span>
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;

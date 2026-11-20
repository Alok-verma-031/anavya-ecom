import "../styles/Products.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const productsData = [
  {
    id: 1,
    name: "Classic Sneakers",
    price: 1999,
    rating: 4.6,
    reviews: 120,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 4999,
    rating: 4.6,
    reviews: 98,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
  },
  {
    id: 3,
    name: "Leather Handbag",
    price: 3499,
    rating: 4.7,
    reviews: 75,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500",
  },
  {
    id: 4,
    name: "Wireless Earbuds",
    price: 2499,
    rating: 4.5,
    reviews: 110,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500",
  },
  {
    id: 5,
    name: "Denim Jacket",
    price: 2999,
    rating: 4.4,
    reviews: 90,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
  },
  {
    id: 6,
    name: "Sunglasses",
    price: 1499,
    rating: 4.6,
    reviews: 85,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500",
  },
  {
    id: 7,
    name: "Running Shoes",
    price: 2299,
    rating: 4.5,
    reviews: 65,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
  },
  {
    id: 8,
    name: "Modern Lamp",
    price: 999,
    rating: 4.3,
    reviews: 45,
    category: "Home & Living",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500",
  },
];

const categories = [
  "Fashion",
  "Electronics",
  "Home & Living",
  "Sports",
  "Beauty",
];


function Products() {
  const [filterData,setFilterData]=useState(productsData);
  const navigate = useNavigate();
  const handleSearch=(e)=>{
    const text=e.target.value.toLowerCase();
    const filter=productsData.filter((item)=>
    {
            return item.name.toLowerCase().includes(text);
    })
    setFilterData(filter);
  }
  
  return (
    <>
      <Navbar />
      <div className="products-page">
        {/* Products Banner */}
        <section className="products-banner">
          <div className="banner-content">
            <h1>Our Products</h1>
            <p>Discover our amazing collection</p>
          </div>
        </section>

        {/* Main Products Section */}
        <section className="products-container">
          {/* Sidebar */}
          <aside className="products-sidebar">
            <div className="filter-group">
              <h4>Search Products</h4>

              <input
                type="text"
                onChange={handleSearch}
                placeholder="Search products..."
              />
            </div>

            <div className="filter-group">
              <h4>Categories</h4>

              {categories.map((category, idx) => (
                <label className="filter-option" key={idx}>
                  <input
                    type="checkbox"
                  />
                  {category}
                </label>
              ))}
            </div>

            <div className="filter-group">
              <h4>Price Range</h4>

              {[
                { label: "₹0 - ₹1,000", value: "1000" },
                { label: "₹1,000 - ₹2,000", value: "2000" },
                { label: "₹2,000 - ₹5,000", value: "5000" },
                { label: "₹5,000+", value: "5000+" },
              ].map((price) => (
                <label className="filter-option" key={price.value}>
                  <input
                    type="radio"
                    name="price"
                  />
                  {price.label}
                </label>
              ))}
            </div>

            <button className="apply-filter-btn">
              {" "}
              {/*onClick={applyFilters} */}
              Apply Filters
            </button>
          </aside>

          {/* Products Content */}
          <div className="products-content">
            <div className="products-toolbar">
              <p>Showing {/*{filteredProducts.length}*/} {productsData.length} products</p>

              <select>
                <option value="popularity">Popularity</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            {/* Product Grid */}
            <ProductCard/>
          </div>
        </section>
      </div>
      <Footer/>
    </>
  );
}

export default Products;

import React, { useEffect, useState } from "react";
import "../styles/ProductCard.css";
import { getAllProducts } from "../services/productServices";
import { useNavigate } from "react-router-dom";
import Categories from "./Categories";

const ProductCard = ({limit}) => {
  const navigate= useNavigate();
  const [product, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState({});

  useEffect(() => {
    getAllProducts().then((res) => setProducts(res.data));
  }, []);

  const toggleWishlist = (id) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  
 const products = limit ? product.slice(-limit):product;
  return (
    <div className="fk-grid">
      {products.map((p) => {
        const discount = p.discount || 20;
        const originalPrice =
          p.originalPrice || Math.round(p.price / (1 - discount / 100));

        const categoryName =
          typeof p.category === "object"
            ? p.category?.categoryName
            : p.category || p.categories || "ANAVAYA";

        return (
          <div className="fk-card" key={p.id}>
            {/* Tall Image Box + Top-Right Heart */}
            <div className="fk-image-box">
              <button
                type="button"
                className={`fk-wish-btn ${wishlist[p.id] ? "active" : ""}`}
                onClick={() => toggleWishlist(p.id)}
              >
                ♥
              </button>

              <img
                src={`http://localhost:8080/uploads/products/${p.imagePath}`}
                alt={p.productName}
                onClick={()=>navigate(`/productsdetails/${p.id}`)}
              />
            </div>
          
            {/* Clean Text Details */}
            <div className="fk-body">
              <span className="fk-brand">{categoryName}</span>
              <h3 className="fk-title">{p.productName}</h3>

              <div className="fk-price-row">
                <span className="fk-price">
                  ₹{Number(p.price).toLocaleString("en-IN")}
                </span>
                <span className="fk-mrp">
                  ₹{Number(originalPrice).toLocaleString("en-IN")}
                </span>
                <span className="fk-discount">{discount}% off</span>
              </div>

              <span className="fk-deal-badge">
                {p.stockQuantity > 0 ? "Hot Deal" : "Out of Stock"}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductCard;
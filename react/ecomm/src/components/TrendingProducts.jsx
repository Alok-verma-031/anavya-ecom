import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";



const TrendingProducts = () => {
  return (
    <section className="section-space pt-0" id="trending">
      <div className="container">
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-end gap-3 mb-4">
          <div>
            <div className="section-kicker">Picked for you</div>
            <h2 className="section-title mb-0">Trending Products</h2>
            <div className="gold-line ms-0"></div>
          </div>
          <Link
            to={"/products"}
            className="btn btn-outline-gold align-self-start align-self-sm-auto"
          >
            View All Products <i className="bi bi-arrow-right ms-1" />
          </Link>
        </div>

        <ProductCard limit={4}/>
      </div>
    </section>
  );
};

export default TrendingProducts;

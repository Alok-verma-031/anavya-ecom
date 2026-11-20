import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/ProductsDetails.css";
import Footer from "../components/Footer";
import { getProductById } from "../services/productServices";

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("description");

    useEffect(() => {
        if (id) {
            getProductById(id)
                .then((res) => setProduct(res.data))
                .catch((err) => console.error("Error fetching product:", err));
        }
    }, [id]);

    if (!product) {
        return <div style={{ textAlign: "center", padding: "60px" }}>Loading product...</div>;
    }

    const imageUrl = `http://localhost:8080/uploads/products/${product.imagePath}`;
    const discount = product.discount || 20;
    const originalPrice = product.originalPrice || Math.round(product.price / (1 - discount / 100));

    return (
        <>
        <div className="product-details-page">

            {/* Breadcrumb */}
            <div className="product-breadcrumb">
                Home <span>›</span> Products <span>›</span>
                <strong>{product.productName}</strong>
            </div>

            {/* Product Section */}
            <section className="product-detail-main">

                {/* Product Thumbnails */}
                <div className="product-thumbnails">
                    <img src={imageUrl} alt={product.productName} />
                </div>

                {/* Main Image */}
                <div className="product-main-image">
                    <img
                        src={imageUrl}
                        alt={product.productName}
                    />
                </div>

                {/* Product Information */}
                <div className="product-information">

                    <h1>{product.productName}</h1>

                    <div className="product-reviews">
                        <span>★★★★★</span>
                        <small>{product.rating || "4.5"} (120 reviews)</small>
                    </div>

                    <div className="product-pricing">
                        <strong>₹{Number(product.price).toLocaleString("en-IN")}</strong>
                        <del>₹{Number(originalPrice).toLocaleString("en-IN")}</del>
                        <span>{discount}% OFF</span>
                    </div>

                    <p className="product-description">
                        {product.description}
                    </p>

                    <div className="product-highlights">
                        <p>✔ Premium Quality</p>
                        <p>✔ Lightweight Design</p>
                        <p>✔ All-Day Comfort</p>
                        <p>✔ Stylish Look</p>
                    </div>

                    <div className="product-stock">
                        <span></span> {product.stockQuantity > 0 ? `In Stock (${product.stockQuantity})` : "Out of Stock"}
                    </div>

                    {/* Quantity and Cart */}
                    <div className="product-actions">

                        <div className="quantity-control">
                            <button onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}>−</button>
                            <span>{quantity}</span>
                            <button onClick={() => setQuantity((q) => (q < product.stockQuantity ? q + 1 : q))}>+</button>
                        </div>

                        <button
                            className="detail-add-cart"
                            disabled={product.stockQuantity === 0}
                            onClick={() => console.log("Added:", product, "Qty:", quantity)}
                        >
                            Add to Cart
                        </button>

                    </div>

                    <button
                        className="buy-now-btn"
                        disabled={product.stockQuantity === 0}
                    >
                        Buy Now
                    </button>

                </div>

            </section>

            {/* Product Tabs */}
            <section className="product-extra-details">

                <div className="product-tabs">
                    <button
                        className={activeTab === "description" ? "selected" : ""}
                        onClick={() => setActiveTab("description")}
                    >
                        Description
                    </button>
                    <button
                        className={activeTab === "specifications" ? "selected" : ""}
                        onClick={() => setActiveTab("specifications")}
                    >
                        Specifications
                    </button>
                    <button
                        className={activeTab === "reviews" ? "selected" : ""}
                        onClick={() => setActiveTab("reviews")}
                    >
                        Reviews
                    </button>
                </div>

                <div className="product-tab-content">
                    {activeTab === "description" && <p>{product.description}</p>}
                    {activeTab === "specifications" && (
                        <p>
                            Category: {typeof product.category === "object" ? product.category?.categoryName : product.category || product.categories} | Available Stock: {product.stockQuantity}
                        </p>
                    )}
                    {activeTab === "reviews" && <p>No customer reviews yet.</p>}
                </div>

            </section>

        </div>
        <Footer/>
        </>
    );
}

export default ProductDetails;
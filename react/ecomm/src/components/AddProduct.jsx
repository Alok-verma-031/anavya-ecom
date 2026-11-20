import React, { useState, useEffect } from "react";
import {
  Package,
  IndianRupee,
  Layers,
  FileText,
  Image as ImageIcon,
  CheckCircle,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import { addProduct} from "../services/productServices";
import {getAllCategory} from "../services/CategoriesServise";
import "../styles/AddProducts.css";

const AddProduct = ({ onBack }) => {
  // 1. Form State (Backend ke exact field names ke saath)
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    price: "",
    stockQuantity: "",
    categoryId: "",
  });

  const [categoryList, setCategoryList] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  // 2. Page load hote hi Categories fetch karna
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await getAllCategory();
        setCategoryList(res.data || res || []);
      } catch (err) {
        console.error("Categories load nahi hui:", err);
      }
    };
    loadCategories();
  }, []);

  // 3. Input Change Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 4. Image aur Live Preview Handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // 5. Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      await addProduct(formData, image);

      setMessage({ type: "success", text: "Product successfully add ho gaya!" });

      // Form aur preview reset
      setFormData({
        productName: "",
        description: "",
        price: "",
        stockQuantity: "",
        categoryId: "",
      });
      setImage(null);
      setImagePreview("");
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Product add nahi ho paya!";
      setMessage({ type: "error", text: errMsg });
    } finally {
      setLoading(false);
    }
  };

  // Live Preview ke liye selected category ka naam nikalna
  const selectedCategoryName =
    categoryList.find((c) => String(c.id) === String(formData.categoryId))
      ?.categoryName || "Category Label";

  return (
    <div className="ap-admin-shell">
      <main className="ap-main-area">
        <div className="ap-container">
          {/* Top Header */}
          <div className="ap-header-nav">
            <button onClick={onBack} className="ap-back-btn">
              <ArrowLeft size={16} /> Back to Dashboard
            </button>
            <div className="ap-breadcrumb">
              Pages / Dashboard / <strong>Add Product</strong>
            </div>
          </div>

          <div className="ap-content-wrap">
            {/* LEFT SIDE: Live Preview Card */}
            <div className="ap-sidebar-preview">
              <div className="ap-preview-card">
                <h3 className="ap-preview-title">Live Preview</h3>
                <div className="ap-image-viewbox">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Product preview"
                      className="ap-img-display"
                    />
                  ) : (
                    <div className="ap-img-placeholder">
                      <ImageIcon size={48} strokeWidth={1.2} />
                      <span>Product Image View</span>
                    </div>
                  )}
                </div>
                <div className="ap-preview-details">
                  <span className="ap-preview-badge">{selectedCategoryName}</span>
                  <h4>{formData.productName || "Your Product Title"}</h4>
                  <p className="ap-preview-desc">
                    {formData.description ||
                      "Brief product descriptions will render right here..."}
                  </p>
                  <div className="ap-preview-footer">
                    <span className="ap-preview-price">
                      ₹{formData.price || "0"}
                    </span>
                    <span className="ap-preview-stock">
                      Stock: {formData.stockQuantity || "0"} pcs
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Add Product Form */}
            <div className="ap-form-panel">
              <div className="ap-panel-heading">
                <div className="ap-brand-icon">
                  <Package size={24} />
                </div>
                <div>
                  <h2>Create New Product</h2>
                  <p>Add new item to your inventory.</p>
                </div>
              </div>

              {message.text && (
                <div
                  className={`ap-alert ${
                    message.type === "error"
                      ? "ap-alert-danger"
                      : "ap-alert-success"
                  }`}
                >
                  {message.type === "error" ? (
                    <AlertCircle size={18} />
                  ) : (
                    <CheckCircle size={18} />
                  )}
                  <span>{message.text}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="ap-form">
                {/* Product Name */}
                <div className="ap-form-group">
                  <label className="ap-label">Product Name *</label>
                  <div className="ap-input-wrapper">
                    <Package className="ap-input-icon" size={16} />
                    <input
                      type="text"
                      name="productName"
                      className="ap-input"
                      placeholder="e.g. Classic Gold Watch"
                      value={formData.productName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="ap-form-group">
                  <label className="ap-label">Category *</label>
                  <div className="ap-input-wrapper">
                    <Layers className="ap-input-icon" size={16} />
                    <select
                      name="categoryId"
                      className="ap-input ap-select"
                      value={formData.categoryId}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select product category</option>
                      {categoryList.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.categoryName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Price & Stock */}
                <div className="ap-form-row">
                  <div className="ap-form-group">
                    <label className="ap-label">Unit Price (₹) *</label>
                    <div className="ap-input-wrapper">
                      <IndianRupee className="ap-input-icon" size={14} />
                      <input
                        type="number"
                        name="price"
                        className="ap-input"
                        placeholder="e.g. 1500"
                        value={formData.price}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="ap-form-group">
                    <label className="ap-label">Stock Quantity *</label>
                    <div className="ap-input-wrapper">
                      <Package className="ap-input-icon" size={15} />
                      <input
                        type="number"
                        name="stockQuantity"
                        className="ap-input"
                        placeholder="e.g. 50"
                        value={formData.stockQuantity}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Image */}
                <div className="ap-form-group">
                  <label className="ap-label">Product Image</label>
                  <div className="ap-input-wrapper">
                    <ImageIcon className="ap-input-icon" size={16} />
                    <input
                      type="file"
                      accept="image/*"
                      className="ap-input"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="ap-form-group">
                  <label className="ap-label">Description</label>
                  <div className="ap-textarea-wrapper">
                    <FileText className="ap-textarea-icon" size={16} />
                    <textarea
                      name="description"
                      className="ap-textarea"
                      rows="3"
                      placeholder="Product details..."
                      value={formData.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>

                {/* Buttons */}
                <div className="ap-btn-actions">
                  <button
                    type="button"
                    onClick={onBack}
                    className="ap-cancel-btn"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="ap-submit-btn"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Add Product to Inventory"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddProduct;
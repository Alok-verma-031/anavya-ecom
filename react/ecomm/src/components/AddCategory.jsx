import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Tags,
  FileText,
  Image as ImageIcon,
  CheckCircle,
  ArrowLeft,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { addCategory } from "../services/CategoriesServise"; // <-- Apni service file ka sahi path dein
import "../styles/AddCategory.css";

const AddCategory = ({ onBack }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // Form State (Service ke exact field name 'catagoryName' ke saath)
  const [formData, setFormData] = useState({
    categoryName: "",
    description: "",
  });

  // UI/Feedback States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Service ka use karke Form Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.categoryName.trim()) {
      setError("Category Name is required!");
      return;
    }

    setLoading(true);

    try {
      const categoryData = {
        categoryName: formData.categoryName.trim(),
        description: formData.description.trim(),
      };

      // Aapki service function call
      await addCategory(categoryData, imageFile);
      setSuccess("Category Added successfully!");

      // Reset form
      setFormData({
        categoryName: "",
        description: "",
      });
      setImageFile(null);
      setImagePreview("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setTimeout(() => {
        handleBack();
      }, 1500);
    } catch (err) {
      console.error("Add Category Error:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to add category."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ac-admin-shell">
      <main className="ac-main-area">
        <div className="ac-container">
          {/* Top Return/Nav header bar */}
          <div className="ac-header-nav">
            <button type="button" onClick={handleBack} className="ac-back-btn">
              <ArrowLeft size={16} /> Back to Dashboard
            </button>
            <div className="ac-breadcrumb">
              Pages / Dashboard / <strong>Add Category</strong>
            </div>
          </div>

          <div className="ac-content-wrap">
            {/* Left preview Section */}
            <div className="ac-sidebar-preview">
              <div className="ac-preview-card">
                <h3 className="ac-preview-title">Live Category Preview</h3>
                <div className="ac-image-viewbox">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Category preview"
                      className="ac-img-display"
                    />
                  ) : (
                    <div className="ac-img-placeholder">
                      <ImageIcon size={48} strokeWidth={1.2} />
                      <span>Category Cover View</span>
                    </div>
                  )}
                </div>
                <div className="ac-preview-details">
                  <span className="ac-preview-badge">STORE COLLECTION</span>
                  <h4>{formData.categoryName || "Your Category Title"}</h4>
                  <p className="ac-preview-desc">
                    {formData.description ||
                      "Category details and collection summary will render right here..."}
                  </p>
                  <div className="ac-preview-footer">
                    <span className="ac-preview-status">Status: Active</span>
                    <span className="ac-preview-count">0 Products</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right form section */}
            <div className="ac-form-panel">
              <div className="ac-panel-heading">
                <div className="ac-brand-icon">
                  <Tags size={24} />
                </div>
                <div>
                  <h2>Create New Category</h2>
                  <p>
                    Organize your store items by adding a new product category.
                  </p>
                </div>
              </div>

              {/* Status/Error/Success Banner */}
              {error && (
                <div className="ac-alert ac-alert-danger" role="alert">
                  <AlertCircle size={18} /> <span>{error}</span>
                </div>
              )}
              {success && (
                <div className="ac-alert ac-alert-success" role="alert">
                  <CheckCircle size={18} /> <span>{success}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="ac-form">
                {/* 1. Category Name field */}
                <div className="ac-form-group">
                  <label htmlFor="categoryName" className="ac-label">
                    Category Name *
                  </label>
                  <div className="ac-input-wrapper">
                    <Tags className="ac-input-icon" size={16} />
                    <input
                      type="text"
                      id="categoryName"
                      name="categoryName"
                      className="ac-input"
                      placeholder="e.g. Luxury Watches"
                      value={formData.categoryName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* 2. Category Image File Input */}
                <div className="ac-form-group">
                  <label htmlFor="categoryImage" className="ac-label">
                    Category Banner / Image
                  </label>
                  <div className="ac-input-wrapper">
                    <ImageIcon className="ac-input-icon" size={16} />
                    <input
                      ref={fileInputRef}
                      type="file"
                      id="categoryImage"
                      name="categoryImage"
                      accept="image/*"
                      className="ac-input"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>

                {/* 3. Description textarea */}
                <div className="ac-form-group">
                  <label htmlFor="description" className="ac-label">
                    Description
                  </label>
                  <div className="ac-textarea-wrapper">
                    <FileText className="ac-textarea-icon" size={16} />
                    <textarea
                      id="description"
                      name="description"
                      className="ac-textarea"
                      rows="4"
                      placeholder="Describe what kind of products belong to this category..."
                      value={formData.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="ac-btn-actions">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="ac-cancel-btn"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="ac-submit-btn"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="ac-spinner" size={14} /> Saving
                        Category...
                      </>
                    ) : (
                      "Add Category"
                    )}
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

export default AddCategory;
import React from 'react'

const Footer = () => {
  return (
    <footer className="site-footer pt-5" id="footer">
      <div className="container">
        <div className="row g-4 pb-4">
          {/* Brand and social links */}
          <div className="col-lg-4 col-md-6">
            <a className="navbar-brand footer-brand mb-3" href="#home">
              <span className="brand-mark"><span>A</span></span>
              <span>
                <span className="brand-name">ANAVAYA</span>
                <span className="brand-tagline">Elegance in Every Choice</span>
              </span>
            </a>
            <p className="text-white-50 mt-3 pe-lg-5">
              Your one-stop destination for fashion, electronics, accessories and everyday essentials.
            </p>
            <div className="mt-3">
              <a className="social-link" href="#" aria-label="Facebook"><i className="bi bi-facebook" /></a>
              <a className="social-link" href="#" aria-label="Instagram"><i className="bi bi-instagram" /></a>
              <a className="social-link" href="#" aria-label="YouTube"><i className="bi bi-youtube" /></a>
              <a className="social-link" href="#" aria-label="X"><i className="bi bi-twitter-x" /></a>
            </div>
          </div>

          {/* Quick navigation */}
          <div className="col-6 col-lg-2 col-md-3">
            <h6 className="footer-heading">Quick Links</h6>
            <a className="footer-link" href="#home">Home</a>
            <a className="footer-link" href="#trending">Shop</a>
            <a className="footer-link" href="#categories">Categories</a>
            <a className="footer-link" href="#new-arrivals">New Arrivals</a>
            <a className="footer-link" href="#about">About Us</a>
          </div>

          {/* Customer support */}
          <div className="col-6 col-lg-2 col-md-3">
            <h6 className="footer-heading">Customer Support</h6>
            <a className="footer-link" href="#">Help Center</a>
            <a className="footer-link" href="#">Track Order</a>
            <a className="footer-link" href="#">Returns &amp; Refunds</a>
            <a className="footer-link" href="#">Shipping Policy</a>
            <a className="footer-link" href="#">FAQs</a>
          </div>

          {/* Contact information: replace demo details before publishing */}
          <div className="col-lg-4 col-md-6">
            <h6 className="footer-heading">Contact Us</h6>
            <p className="footer-link"><i className="bi bi-envelope me-2" /> support@anavaya.in</p>
            <p className="footer-link"><i className="bi bi-telephone me-2" /> +91 98765 43210</p>
            <p className="footer-link"><i className="bi bi-geo-alt me-2" /> Lucknow, India</p>
            <p className="small text-white-50 mt-3">
              Replace these sample contact details with your official business details.
            </p>
          </div>
        </div>

        {/* Copyright and legal links */}
        <div className="footer-bottom py-3">
          <div className="row align-items-center gy-2">
            <div className="col-md-6 text-center text-md-start">
              &copy; {new Date().getFullYear()} ANAVAYA. All Rights Reserved.Designed & Developed By <span className='alok'>Alok Kumar Verma</span>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <a className="text-white-50 me-3" href="#">Privacy Policy</a>
              <a className="text-white-50 me-3" href="#">Terms &amp; Conditions</a>
              <a className="text-white-50" href="#">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
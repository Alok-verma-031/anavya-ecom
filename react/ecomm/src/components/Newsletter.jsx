import React from "react";
import { useState } from "react";

const Newsletter = () => {
  const DEFAULT_MESSAGE = "No spam. Unsubscribe whenever you like.";
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(DEFAULT_MESSAGE);

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: replace with your real API call, e.g.
    // await fetch("/api/subscribe", { method: "POST", body: JSON.stringify({ email }) });

    setMessage(`Thanks for subscribing, ${email}!`);
    setEmail("");
  };
  return (
    <>
      <section className="newsletter">
        <div className="container position-relative">
          <div className="row align-items-center g-4">
            <div className="col-lg-6">
              <div className="d-flex align-items-center gap-3">
                <i className="bi bi-envelope-paper display-5 text-warning"></i>
                <div>
                  <h2 className="section-title fs-2 mb-1">
                    Join the ANAVAYA Circle
                  </h2>
                  <p className="mb-0 text-white-50">
                    Get new arrivals, updates and special offers in your inbox.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <form
                className="newsletter-form ms-lg-auto"
                id="newsletterForm"
                onSubmit={handleSubmit}
              >
                <div className="input-group">
                  <input
                    className="form-control"
                    type="email"
                    id="newsletterEmail"
                    placeholder="Enter your email address"
                    required
                    aria-label="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button className="btn btn-gold" type="submit">
                    Subscribe
                  </button>
                </div>
                <div
                  className="small text-white-50 mt-2"
                  id="newsletterMessage"
                  aria-live="polite"
                >
                  {message}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Newsletter;

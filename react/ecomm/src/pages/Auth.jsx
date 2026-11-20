import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import { login, saveSession } from "../services/authService";

const Auth = () => {
  const navigate= useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function loginHandleChange(e) {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function loginHandleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!loginFormData.email.trim() || !loginFormData.password) {
      setError("Please Enter Your Email or Password !");
      return;
    }

    try {
      setLoading(true);
      const response = await login({
        email: loginFormData.email.trim(),
        password: loginFormData.password,
      });

      const user = response.data;
      const actualRole = user.role?.toUpperCase();

      if (actualRole !== "CUSTOMER" && actualRole !== "ADMIN") {
        setError("Role is not recognized !");
        return;
      }
      // save user session
      saveSession({
        email: user.email,
        role: actualRole,
      });

      if(actualRole==="ADMIN")
      {
        navigate("/adminDash");
      }
      else 
        {
          navigate("/");
        }
    } catch (err) {
      setError(err.response?.data?.message || "Server Error. Please Try After Some Time .");
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <section className="auth-section">
        <div className="container-fluid p-0">
          <div className="row justify-content-center align-items-center auth-background">
            <div className="col-md-6 col-lg-5 my-5">
              {isLogin ? (
                <>
                  <div className="card auth-card p-4">
                    <h2 className="text-center mb-4 auth-title">Login</h2>
                      {error &&
                        <div className="errorMessage" role="alert">{error}</div>
                      }
                    <form onSubmit={loginHandleSubmit}>
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control auth-input"
                          placeholder="Enter your email"
                          required
                          name="email"
                          id="email"
                          value={loginFormData.email}
                          onChange={loginHandleChange}
                          autoComplete="email"
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                          type="password"
                          className="form-control auth-input"
                          placeholder="Enter password"
                          required
                          name="password"
                          id="password"
                          value={loginFormData.password}
                          onChange={loginHandleChange}
                          autoComplete="password"
                        />
                      </div>

                      <button type="submit" className="btn auth-btn w-100" disabled={loading}>
                        {loading ? "Signing in.." : "Sing In"}
                      </button>

                      <p className="text-center mt-4 mb-0 auth-switch">
                        Don't have an account?{" "}
                        <Link to="" onClick={() => setIsLogin(false)}>
                          Sign Up
                        </Link>
                      </p>
                    </form>
                  </div>
                </>
              ) : (
                <>
                  <div className="card auth-card p-4">
                    <h2 className="text-center mb-4 auth-title">
                      Create Account
                    </h2>

                    <form>
                      <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input
                          type="text"
                          className="form-control auth-input"
                          placeholder="Enter your name"
                          required
                          name="name"
                          id="name"
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control auth-input"
                          placeholder="Enter your email"
                          required
                          name="email"
                          id="email"
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Phone Number</label>
                        <input
                          type="tel"
                          className="form-control auth-input"
                          placeholder="Enter phone number"
                          required
                          name="contact"
                          id="contact"
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                          type="password"
                          className="form-control auth-input"
                          placeholder="Enter password"
                          required
                          name="password"
                          id="password"
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Address</label>
                        <input
                          type="text"
                          className="form-control auth-input"
                          placeholder="Address"
                          required
                          name="address"
                          id="address"
                        />
                      </div>

                      <button type="submit" className="btn auth-btn w-100">
                        Register
                      </button>

                      <p className="text-center mt-4 mb-0 auth-switch">
                        Already have an account?{" "}
                        <Link to="" onClick={() => setIsLogin(true)}>
                          Sign In
                        </Link>
                      </p>
                    </form>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Auth;

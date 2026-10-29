import React, { useState } from "react";
import TopNav from "../component/TopNav";
import MainNav from "../component/MainNav";
import Footer from "../component/Footer";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  // register
  const [isLogin, setIsLogin] = useState(true);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    address: "",
  });

  const handelChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/user", data);
      alert("User added Successfully !");
      navigate("/login")
      setData({
        name: "",
        email: "",
        password: "",
        contact: "",
        address: "",
      });
    } catch (error) {
      console.log("Error :", error);
      console.error("Backend message:", error.response?.data);
      alert("server error !");
    }
  };

  // login
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handelLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/login",
        loginData,
      );
      const response = res.data.success;
      if (response) {
        alert(res.data.message);
        navigate("/userDash");
      } else {
        alert(res.data.message);
        navigate("/login");
      }
    } catch (er) {
      console.log("Error :", er);
      alert("Server Error. please Try Again !");
    }
  };

  return (
    <>
      <TopNav />
      <section>
        <div class="container-fluid m-0 p-0">
          <div className="row justify-content-center align-content-center bg-register-img">
            <div className="col-md-5 my-5">
              {/* Login here */}
              {isLogin ? (
                <>
                  <div className="card p-4 shadow">
                    <h2 className="text-center mb-4">Login</h2>
                    <form onSubmit={handleLoginSubmit}>
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter your email"
                          required=""
                          name="email"
                          id="email"
                          onChange={handelLoginChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Enter password"
                          required=""
                          name="password"
                          id="password"
                          onChange={handelLoginChange}
                        />
                      </div>
                      <button type="submit" className="btn btn-primary w-100">
                        Login
                      </button>
                      <p className="text-center mt-3 mb-0">
                        Don't have an account?
                        <Link to="" onClick={() => setIsLogin(false)}>
                          Sign Up
                        </Link>
                      </p>
                    </form>
                  </div>
                </>
              ) : (
                // register here
                <>
                  <div className="card p-4 shadow">
                    <h2 className="text-center mb-4">Register</h2>
                    <form onSubmit={handelSubmit}>
                      <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your name"
                          required=""
                          name="name"
                          id="name"
                          onChange={handelChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter your email"
                          required=""
                          name="email"
                          id="email"
                          onChange={handelChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Phone Number</label>
                        <input
                          type="tel"
                          className="form-control"
                          placeholder="Enter phone number"
                          required=""
                          name="contact"
                          id="contact"
                          onChange={handelChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Enter password"
                          required=""
                          name="password"
                          id="password"
                          onChange={handelChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Address</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Address"
                          required=""
                          name="address"
                          id="address"
                          onChange={handelChange}
                        />
                      </div>
                      <button type="submit" className="btn btn-primary w-100">
                        Register
                      </button>
                      <p className="text-center mt-3 mb-0">
                        Already have an account?
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

export default Register;

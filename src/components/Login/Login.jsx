import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!emailAddress || !password) {
      setFormError("Both fields are required");
      toast.error("Both fields are required", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }

    setFormError("");

    console.log({ emailAddress, password });

    toast.success("Login successful!", {
      position: "bottom-center",
      autoClose: 3000,
      theme: "colored",
    });

    setEmailAddress("");
    setPassword("");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login to your account</h2>
        <form onSubmit={handleLogin} className="form">
          <div className="input-group">
            <label htmlFor="emailAddress" className="input-label">
              Email Address
            </label>
            <input
              type="email"
              id="emailAddress"
              placeholder="Enter your email"
              required
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              className="input-field"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
          </div>

          {formError && <p className="error-message">{formError}</p>}

          <div className="signin-submit">
            <button type="submit" className="submit-btn">
              Login
            </button>
          </div>
        </form>

        <p className="signup-text">
          Don't have an account?{" "}
          <Link to="/signup" className="signup-link">
            Sign up here
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;

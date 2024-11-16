import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import "./Sign.css";

function Sign() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    h;
    if (password !== confirmPassword) {
      setFormError("Passwords do not match.");
      toast.error("Passwords do not match.", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }

    setFormError("");
    console.log({
      firstName,
      lastName,
      emailAddress,
      password,
    });

    toast.success("Account created successfully!", {
      position: "bottom-center",
      autoClose: 3000,
      theme: "colored",
    });

    setFirstName("");
    setLastName("");
    setEmailAddress("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="sign-container">
      <div className="sign-card">
        <h2 className="sign-title">Create your account here</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="firstName" className="input-label">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input-field"
            />
          </div>

          <div className="input-group">
            <label htmlFor="lastName" className="input-label">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input-field"
            />
          </div>

          <div className="input-group">
            <label htmlFor="emailAddress" className="input-label">
              Email Address
            </label>
            <input
              type="email"
              id="emailAddress"
              placeholder="Email Address"
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
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword" className="input-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-field"
            />
          </div>

          {formError && <p className="error-message">{formError}</p>}

          <div className="signin-submit">
            <button type="submit" className="submit-btn">
              Create Account
            </button>
          </div>
        </form>

        <p className="login-text">
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            Login here
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Sign;

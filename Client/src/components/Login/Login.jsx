import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "react-query";
import apiBase from "../../utils/apiBase";
import useUserState from "../../Store/UserStore";
import "./Login.css";

function Login() {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(null);

  const { setUser } = useUserState();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: async (loginData) => {
      const response = await fetch(`${apiBase}/auth/login`, {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      return data;
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!emailAddress || !password) {
      setFormError("Both fields are required.");
      toast.error("Both fields are required.", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }

    setFormError("");

    const loginData = { emailAddress, password };

    mutate(loginData, {
      onSuccess: (data) => {
        console.log("Login Response:", data);
        const { user, token } = data; // Extract token from the response
        setUser(user, token); // Set both user and token in the state

        toast.success("Login successful!", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });

        setEmailAddress("");
        setPassword("");
        navigate("/products");
      },
      onError: (error) => {
        toast.error(error.message || "Something went wrong.", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
        console.error(error);
      },
    });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login to your account</h2>
        <form onSubmit={handleSubmit}>
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
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        <p className="signup-text">
          Don't have an account?{" "}
          <Link to="/sign up" className="signup-link">
            Sign up here
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-1/2 ">
        <h2 className="text-center text-4xl font-bold capitalize text-gray-800 mb-6">
          Login to your account
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="inputs-details">
            <label
              htmlFor="emailAddress"
              className="block text-gray-700 font-medium mb-2 text-2xl"
            >
              Email Address
            </label>
            <input
              type="email"
              id="emailAddress"
              placeholder="Enter your email"
              required
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              className="w-full px-12 py-4 text-1xl border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="inputs-details">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2 text-2xl"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-12 py-4  text-1xl border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {formError && (
            <p className="text-red-600 text-sm mt-2">{formError}</p>
          )}

          <div className="signin-submit">
            <button
              type="submit"
              className="w-full bg-blue-500 text-2xl text-white py-3 rounded-lg hover:bg-blue-600 transition-all duration-300"
            >
              Login
            </button>
          </div>
        </form>

        <p className="login-text mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 hover:underline focus:ring-2 focus:ring-blue-500"
          >
            Sign up here
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;

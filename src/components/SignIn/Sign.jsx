import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function Sign() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setFormError("Passwords do not match");
      toast.error("Passwords do not match", {
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-1/2 ">
        <h2 className="text-center text-3xl font-bold capitalize text-gray-800 mb-6">
          Create your account here
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="inputs-details">
            <label
              htmlFor="firstName"
              className="block text-gray-700 font-medium mb-2 text-2xl"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="inputs-details">
            <label
              htmlFor="lastName"
              className="block text-gray-700 font-medium mb-2 text-2xl"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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
              placeholder="Email Address"
              required
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="inputs-details">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-medium mb-2 text-2xl"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              Create Account
            </button>
          </div>
        </form>
        <p className="login-text mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:underline focus:ring-2 focus:ring-blue-500"
          >
            Login here
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Sign;

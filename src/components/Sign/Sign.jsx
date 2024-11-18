import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import apiBase from "../../utils/apiBase";
import { useMutation } from "react-query";
import "./Sign.css";

function Sign() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState(null);

  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: async function (newUser) {
      const response = await fetch(`${apiBase}/users`, {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const data = response.json();
      console.log(data);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

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

    const FormData = {
      firstName,
      lastName,
      phoneNumber,
      emailAddress,
      password,
    };

    mutate(FormData, {
      onSuccess: () => {
        toast.success("Account created successfully!", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });

        setFirstName("");
        setLastName("");
        setPhoneNumber("");
        setEmailAddress("");
        setPassword("");
        setConfirmPassword("");
        navigate("/login");
      },
      onError: (error) => {
        toast.error("Failed to create account. Try again later.", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
        console.error(error);
      },
    });
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
            <label htmlFor="phone Number" className="input-label">
              phone number
            </label>
            <input
              type="number"
              id="phoneNumber"
              placeholder="Phone Number"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
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
              {isLoading ? "Loading, please wait..." : "Create account"}
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

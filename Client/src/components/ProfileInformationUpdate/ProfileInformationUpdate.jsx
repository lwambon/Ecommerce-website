import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import apiBase from "../../utils/apiBase";
import useUserState from "../../store/userStore";
import "./ProfileInformationUpdate.css";

function ProfileInformation() {
  const [profilePicture, setProfilePicture] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [updateSuccessMessage, setUpdateSuccessMessage] = useState("");

  const setUser = useUserState((state) => state.setUser);
  const user = useUserState((state) => state.user);
  const userId = user?.id || JSON.parse(localStorage.getItem("user"))?.id;

  const uploadToCloudinary = async (file) => {
    setIsUploading(true);
    setUploadMessage("Uploading image...");
    const formData = new FormData();
    const present_key = "gevuuttq";
    const cloud_name = "ddvzeq4od";
    formData.append("file", file);
    formData.append("upload_preset", present_key);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();
      if (data.secure_url) {
        setUploadMessage("Image uploaded successfully!");
        toast.success("Image uploaded successfully!", {
          theme: "colored",
          duration: 3000,
        });
        return data.secure_url;
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      setUploadMessage("Error uploading image. Please try again.");
      toast.error("Error uploading image. Please try again.", {
        theme: "colored",
        duration: 3000,
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const { mutate, isLoading } = useMutation(
    async (updatedUserObj) => {
      let imageUrl = updatedUserObj.profilePicture;
      if (updatedUserObj.profilePicture) {
        imageUrl = await uploadToCloudinary(updatedUserObj.profilePicture);
      }

      const response = await fetch(`${apiBase}/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...updatedUserObj, profilePicture: imageUrl }),
        credentials: "include",
      });

      if (!response.ok) {
        const error = (await response.json()).message || "An error occurred";
        throw new Error(error);
      }

      return response.json();
    },
    {
      onSuccess: (data) => {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        setUpdateSuccessMessage("Profile information updated successfully!");
        toast.success("Profile information updated successfully", {
          theme: "colored",
          duration: 3000,
        });
      },
      onError: (error) => {
        toast.error(error.message, { theme: "colored", duration: 3000 });
      },
    },
  );

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setProfilePicture(storedUser.profilePicture || null);
      setFirstName(storedUser.firstName || "");
      setLastName(storedUser.lastName || "");
      setPhoneNumber(storedUser.phoneNumber || "");
      setEmailAddress(storedUser.emailAddress || "");
    } else if (user) {
      setProfilePicture(user.profilePicture || null);
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setPhoneNumber(user.phoneNumber || "");
      setEmailAddress(user.emailAddress || "");
    }
  }, [user]);

  function handleUpdateProfileInformation(e) {
    e.preventDefault();
    if (!firstName || !lastName || !emailAddress || !phoneNumber) {
      return toast.error("All fields are required", {
        theme: "colored",
        duration: 3000,
      });
    }

    mutate({ profilePicture, firstName, lastName, phoneNumber, emailAddress });
  }

  return (
    <div className="profile-section">
      <div className="profile-container">
        <h2 className="title-personal-information">
          Personal Information Update
        </h2>
        <form
          onSubmit={handleUpdateProfileInformation}
          className="personal-information-details"
        >
          <div className="input-section">
            <div className="uploading-image-section">
              <label htmlFor="profilePicture">Profile Picture</label>
              <input
                type="file"
                id="profilePicture"
                accept="image/*"
                onChange={(e) => setProfilePicture(e.target.files[0])}
              />
            </div>
            {isUploading && (
              <div className="uploading-indicator">{uploadMessage}</div>
            )}
          </div>
          <div className="input-section">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              className="input-details"
              placeholder="First Name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="input-section">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              className="input-details"
              placeholder="Last Name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="input-section">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              className="input-details"
              placeholder="Phone Number"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="input-section">
            <label htmlFor="emailAddress">Email Address</label>
            <input
              type="email"
              id="emailAddress"
              className="input-details"
              placeholder="Email Address"
              required
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? "Loading please wait..." : "Update Profile"}
          </button>
        </form>

        {updateSuccessMessage && (
          <div className="update-success-message">{updateSuccessMessage}</div>
        )}
      </div>
    </div>
  );
}

export default ProfileInformation;

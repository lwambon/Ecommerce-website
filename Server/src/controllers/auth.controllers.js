import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const client = new PrismaClient();

// User Login Handler
export const loginUsers = async (req, res) => {
  try {
    const { emailAddress, password } = req.body;

    // Query database for the user with the email address
    const user = await client.users.findUnique({
      where: {
        emailAddress: emailAddress,
      },
    });

    // Check if user does not exist
    if (!user) {
      return res
        .status(401)
        .json({ message: "Incorrect email address or password." });
    }

    // If user exists, verify the password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res
        .status(401)
        .json({ message: "Incorrect email address or password." });
    }

    // Generate JWT token if password matches
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d", // Token expiry (optional)
    });

    // Set token in cookie and respond with user info
    res.cookie("authToken", token, { httpOnly: true, secure: true }).json({
      message: "Login successful",
      user: {
        id: user.id,
        emailAddress: user.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ message: "Something went wrong, try again later" });
  }
};

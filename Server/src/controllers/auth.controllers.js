import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const Client = new PrismaClient();

export const loginUsers = async (req, res) => {
  try {
    const { emailAddress, password } = req.body;

    const user = await Client.users.findFirst({
      where: { emailAddress: emailAddress },
    });

    if (!user) {
      res.status(401).json({ message: "wrong email address or password" });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ message: "wrong email address or password" });
      return;
    }

    // Generate token if password matches
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    res.cookie("authToken", token, { httpOnly: true }).json({
      message: "Login successful",
      user: {
        id: user.id,
        emailAddress: user.emailAddress,
        phoneNumber: user.phoneNumber,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, try again later" });
  }
};

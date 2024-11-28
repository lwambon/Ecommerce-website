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
      token, // Include token in the response body
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

export async function updatePassword(req, res) {
  try {
    const userId = req.userId;
    const prevPassword = req.body.prevPassword;
    const newPassword = req.body.newPassword;

    const user = await Client.users.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    await bcrypt.compare(prevPassword, user.password);

    const theyMatch = await bcrypt.compare(prevPassword, user.password);

    if (theyMatch) {
      const hashedPassword = await bcrypt.hash(newPassword, 8);
      const updated = await Client.users.update({
        where: {
          id: userId,
        },
        data: {
          password: hashedPassword,
        },
      });
      res.status(200).json({ message: "password updated succesfully" });
    }
    res.status(400).json({ message: "wrong previous password" });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "Something went wrong, try again later" });
  }
}

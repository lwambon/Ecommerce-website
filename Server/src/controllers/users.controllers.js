import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const Client = new PrismaClient();

export const registerUsers = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, emailAddress, password } =
      req.body;

    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = await Client.users.create({
      data: {
        firstName,
        lastName,
        phoneNumber,
        emailAddress,
        password: hashedPassword,
      },
    });
    res.status(201).json(newUser);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "error registering a new user" });
  }
};

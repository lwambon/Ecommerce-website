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

export const updateUserInformation = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, emailAddress, profilePicture } =
      req.body;
    const userId = req.userId;
    console.log(userId);
    const user = await Client.users.update({
      where: {
        id: userId,
      },
      data: {
        firstName,
        lastName,
        phoneNumber,
        emailAddress,
        profilePicture: profilePicture || null,
      },
    });
    res.status(200).json(user);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

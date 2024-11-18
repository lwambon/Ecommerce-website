import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const Client = new PrismaClient();
export const loginUsers = async (req, res) => {
  try {
    const {emailAddress, password} =req.body;

    const user = await Client.users.findFirst({
      where:{emailAddress:emailAddress}
    })
    if(!user){
      res.status(401).json({message:"wrong email address or password"})
      return;
    }

    const passwordMatch =await bcrypt.compare(password, user.password);

    if(!passwordMatch){
      res.status(401).json({message:"wrong email address or password"})
      return;
    }

    const token = jwt.sign(user.id, process.env.JWT_SECRET);

    res.cookie("authToken", token, {httponly: true}).status(200).json(user)
    
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, try again later." });
  }
};

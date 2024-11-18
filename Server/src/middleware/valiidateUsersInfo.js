import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const validateUserInfo = async (req, res, next) => {
  const { firstName, lastName, phoneNumber, emailAddress, password } = req.body;

  try {
    if (!firstName)
      return res.status(400).json({ message: "First name is required" });
    if (!lastName)
      return res.status(400).json({ message: "Last name is required" });
    if (!phoneNumber)
      return res.status(400).json({ message: "Phone number is required" });
    if (!emailAddress)
      return res.status(400).json({ message: "Email address is required" });
    if (!password)
      return res.status(400).json({ message: "Password is required" });

    const userWithEmail = await prisma.users.findUnique({
      where: { emailAddress },
    });
    if (userWithEmail) {
      return res
        .status(400)
        .json({ message: "Email address is already in use" });
    }

    next();
  } catch (error) {
    console.error("Error validating user info:", error);
    res.status(500).json({ message: "Error validating user information" });
  }
};

export default validateUserInfo;

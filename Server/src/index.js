import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import cookieParser from "cookie-parser";
import {
  registerUsers,
  updateUserInformation,
} from "./controllers/users.controllers.js";
import validateUserInfo from "./middleware/valiidateUsersInfo.js";
import verifyToken from "./middleware/verifyToken.js";
import { loginUsers } from "./controllers/auth.controllers.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);

const Client = new PrismaClient();

app.post("/users", validateUserInfo, registerUsers);
app.post("/auth/login", loginUsers);
// Update user information
app.put("/users/:userId", verifyToken, updateUserInformation);

// Creating products according to categories
// app.post("/products", verifyToken, ProductsClothes);

app.listen(4000, () => {
  console.log("Server running successfully");
});

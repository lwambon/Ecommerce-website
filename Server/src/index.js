import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import { registerUsers } from "./controllers/users.controllers.js";
import validateUserInfo from "./middleware/valiidateUsersInfo.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    method: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);

const Client = new PrismaClient();

app.post("/users", validateUserInfo, registerUsers);

app.listen(4000, () => {
  console.log("Server running successfully");
});

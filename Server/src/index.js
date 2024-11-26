import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {
  registerUsers,
  updateUserInformation,
} from "./controllers/users.controllers.js";
import validateUserInfo from "./middleware/valiidateUsersInfo.js";
import verifyToken from "./middleware/verifyToken.js";
import { loginUsers, updatePassword } from "./controllers/auth.controllers.js";
import validateProduct from "./middleware/validateproduct.js";
import {
  createProduct,
  getProducts,
  addToCart,
  getCartItemsByUser,
  removeCartItem,
} from "./controllers/products.controllers.js";

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

app.post("/users", validateUserInfo, registerUsers);
app.post("/auth/login", loginUsers);
// updating passwords
app.patch("/auth/password", verifyToken, updatePassword);
// Update user information
app.put("/users/:userId", verifyToken, updateUserInformation);

//creating a product
app.post("/products", verifyToken, validateProduct, createProduct);

// Creating products according to categories
app.get("/products", getProducts);
//adding items to cart
app.post("/products/:userId", verifyToken, addToCart);

//getting all products added to cart by user
app.get("/cart/:userId", verifyToken, getCartItemsByUser);

//deleting items from cart
app.delete("/cart/:userId/products/:productId", verifyToken, removeCartItem);

app.listen(4000, () => {
  console.log("Server running successfully");
});

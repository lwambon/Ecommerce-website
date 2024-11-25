import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createProduct(req, res) {
  try {
    const { title, description, category, price, rating, brand, reviews } =
      req.body;
    const userId = req.userId;

    if (!title || !description || !category || !price) {
      return res
        .status(400)
        .json({ error: "All required fields must be provided." });
    }

    const newProduct = await prisma.products.create({
      data: {
        title,
        description,
        category,
        price,
        rating,
        brand,
        reviews,
        owner: userId,
      },
    });

    res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "Something went wrong, try again later" });
  }
}

export const getProducts = async (req, res) => {
  try {
    const { userId } = req.query;
    const products = userId
      ? await prisma.products.findMany({
          where: {
            owner: userId,
          },
        })
      : await prisma.products.findMany();

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong while fetching products" });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    console.log("Request Data:", { userId, productId, quantity });

    const user = await prisma.users.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const product = await prisma.products.findUnique({
      where: { id: productId },
    });
    if (!product) {
      return res.status(400).json({ error: "Product not found" });
    }

    const cartItem = await prisma.cart.create({
      data: {
        userId,
        productId,
        quantity: quantity || 1,
      },
    });

    res.status(201).json({ message: "Item added to cart", cartItem });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ error: "Failed to add item to cart" });
  }
};

export const getCartItemsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await prisma.users.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const cartItems = await prisma.cart.findMany({
      where: { userId },
      include: {
        product: true,
      },
    });

    if (cartItems.length === 0) {
      return res
        .status(404)
        .json({ message: "No items in the cart for this user" });
    }

    res.status(200).json({ cartItems });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
};

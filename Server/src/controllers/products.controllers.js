import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createProduct(req, res) {
  try {
    const {
      title,
      image,
      description,
      category,
      price,
      rating,
      brand,
      reviews,
    } = req.body;
    const userId = req.userId;

    // Check if the user exists
    const userExists = await prisma.users.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      return res.status(400).json({ error: "User not found." });
    }

    // Validate required fields (brand is now optional)
    if (!title || !description || !category || !price) {
      return res
        .status(400)
        .json({ error: "All required fields must be provided." });
    }

    const newProduct = await prisma.products.create({
      data: {
        title,
        image,
        description,
        category,
        price,
        rating,
        brand: brand || null,
        owner: userId,
        reviews: {
          create: reviews
            ? reviews.map((review) => ({
                rating: review.rating,
                comment: review.comment,
                date: new Date(review.date),
                reviewerName: review.reviewerName,
                reviewerEmail: review.reviewerEmail,
              }))
            : [],
        },
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

    // Ensure product exists in the products table
    let product = await prisma.products.findUnique({
      where: { id: productId },
    });

    if (!product) {
      // Product does not exist, return an error or create it
      return res.status(400).json({ error: "Product not found in database" });
    }

    // Check if product is already in the user's cart
    const existingCartItem = await prisma.cart.findUnique({
      where: {
        userId_productId: {
          userId: userId,
          productId: productId,
        },
      },
    });

    if (existingCartItem) {
      return res.status(400).json({ error: "Product is already in the cart" });
    }

    // If product is not in cart, add to cart
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

export const removeCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.userId;

    const cartItem = await prisma.cart.findUnique({
      where: {
        userId_productId: {
          userId: userId,
          productId: parseInt(productId),
        },
      },
    });

    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    await prisma.cart.delete({
      where: {
        userId_productId: {
          userId: userId,
          productId: parseInt(productId),
        },
      },
    });

    res.status(200).json({ message: "Item removed from cart successfully" });
  } catch (error) {
    console.error("Error removing cart item:", error);
    res
      .status(500)
      .json({ message: "Something went wrong, please try again later" });
  }
};

export const checkout = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await prisma.users.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const cartItems = await prisma.cart.findMany({
      where: { userId },
      include: { product: true },
    });

    if (cartItems.length === 0) {
      return res
        .status(400)
        .json({ error: "Cart is empty, nothing to checkout" });
    }

    let totalAmount = 0;
    const checkoutItems = cartItems.map((item) => {
      totalAmount += item.product.price * item.quantity;
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: item.product.price,
        totalPrice: item.product.price * item.quantity,
      };
    });

    const newCheckoutHistory = {
      date: new Date(),
      items: checkoutItems,
      totalAmount: totalAmount,
    };

    await prisma.users.update({
      where: { id: userId },
      data: {
        checkoutHistory: {
          push: newCheckoutHistory,
        },
      },
    });

    await prisma.cart.deleteMany({
      where: { userId },
    });

    res
      .status(200)
      .json({
        message: "Checkout successful, cart cleared",
        checkoutHistory: newCheckoutHistory,
      });
  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).json({ error: "Failed to process checkout" });
  }
};

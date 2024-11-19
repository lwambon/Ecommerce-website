import { PrismaClient } from "@prisma/client";

const Client = new PrismaClient();

export const ProductsClothes = async (req, res) => {
  try {
    const { ProductName, productCategory, ProductPrice, ProductImageUrl } =
      req.body;

    const savedData = await Client.clothes.create({
      data: {
        ProductName,
        productCategory,
        ProductPrice,
        ProductImageUrl,
      },
    });

    res.status(201).json({
      message: "Clothes data saved successfully",
      savedData,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching and storing clothes data" });
  }
};

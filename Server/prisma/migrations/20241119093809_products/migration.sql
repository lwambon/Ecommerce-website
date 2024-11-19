-- CreateTable
CREATE TABLE "clothes" (
    "id" SERIAL NOT NULL,
    "ProductName" TEXT NOT NULL,
    "productCategory" TEXT NOT NULL,
    "ProductPrice" DOUBLE PRECISION NOT NULL,
    "ProductImageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clothes_pkey" PRIMARY KEY ("id")
);

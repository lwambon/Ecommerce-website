/*
  Warnings:

  - You are about to drop the column `CreatedAt` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "CreatedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "cart" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cart_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('IN', 'OUT');

-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE
    "User" (
        "UserID" SERIAL NOT NULL,
        "Name" TEXT NOT NULL,
        "Surname" TEXT NOT NULL,
        "Email" TEXT NOT NULL,
        "Password" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        "Phone" TEXT NOT NULL,
        CONSTRAINT "User_pkey" PRIMARY KEY ("UserID")
    );

-- CreateTable
CREATE TABLE
    "Product" (
        "ProductID" SERIAL NOT NULL,
        "ProductName" TEXT NOT NULL,
        "BarcodeNumber" TEXT NOT NULL,
        "Description" TEXT,
        "SalePrice" DOUBLE PRECISION NOT NULL,
        "PurchasePrice" DOUBLE PRECISION NOT NULL,
        "StockType" TEXT NOT NULL,
        "Stok_Quantity" INTEGER NOT NULL,
        "SupplierID" INTEGER NOT NULL,
        "Created_At" TIMESTAMP(3) NOT NULL,
        "Update_At" TIMESTAMP(3) NOT NULL,
        "UserID" INTEGER NOT NULL,
        "clientClientID" INTEGER,
        CONSTRAINT "Product_pkey" PRIMARY KEY ("ProductID")
    );

-- CreateTable
CREATE TABLE
    "Supplier" (
        "SupplierID" SERIAL NOT NULL,
        "SupplierName" TEXT NOT NULL,
        "SupplierSurname" TEXT NOT NULL,
        "Phone" TEXT NOT NULL,
        "Created_At" TIMESTAMP(3) NOT NULL,
        "Update_At" TIMESTAMP(3) NOT NULL,
        "Address" TEXT NOT NULL,
        "UserID" INTEGER,
        CONSTRAINT "Supplier_pkey" PRIMARY KEY ("SupplierID")
    );

-- CreateTable
CREATE TABLE
    "Client" (
        "ClientID" SERIAL NOT NULL,
        "ClientName" TEXT NOT NULL,
        "ClientSurname" TEXT NOT NULL,
        "Phone" TEXT NOT NULL,
        "Address" TEXT NOT NULL,
        "UserID" INTEGER NOT NULL,
        "Created_At" TIMESTAMP(3) NOT NULL,
        "Update_At" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "Client_pkey" PRIMARY KEY ("ClientID")
    );

-- CreateTable
CREATE TABLE
    "Purchases" (
        "PurchasesId" SERIAL NOT NULL,
        "ProductID" INTEGER NOT NULL,
        "SupplierID" INTEGER NOT NULL,
        "Quantity" INTEGER NOT NULL,
        "Purchase_date" TIMESTAMP(3) NOT NULL,
        "Total_amount" DOUBLE PRECISION NOT NULL,
        "UserID" INTEGER NOT NULL,
        "ClientID" INTEGER,
        CONSTRAINT "Purchases_pkey" PRIMARY KEY ("PurchasesId")
    );

-- CreateTable
CREATE TABLE
    "Sale" (
        "SaleID" SERIAL NOT NULL,
        "ProductID" INTEGER NOT NULL,
        "SaleDate" TIMESTAMP(3) NOT NULL,
        "TotalAmount" DOUBLE PRECISION NOT NULL,
        "UserID" INTEGER NOT NULL,
        "Quantity" INTEGER NOT NULL,
        "SaleType" TEXT NOT NULL,
        "ClientID" INTEGER,
        "isActive" BOOLEAN NOT NULL DEFAULT true,
        CONSTRAINT "Sale_pkey" PRIMARY KEY ("SaleID")
    );

-- CreateTable
CREATE TABLE
    "StockTransaction" (
        "TransactionID" SERIAL NOT NULL,
        "ProductID" INTEGER NOT NULL,
        "TransactionType" "TransactionType" NOT NULL,
        "Quantity" INTEGER NOT NULL,
        "TransactionDate" TIMESTAMP(3) NOT NULL,
        "Description" TEXT,
        CONSTRAINT "StockTransaction_pkey" PRIMARY KEY ("TransactionID")
    );

-- CreateTable
CREATE TABLE
    "Return" (
        "ReturnID" SERIAL NOT NULL,
        "SaleID" INTEGER NOT NULL,
        "ProductID" INTEGER NOT NULL,
        "Quantity" INTEGER NOT NULL,
        "ReturnDate" TIMESTAMP(3) NOT NULL,
        "ReturnDescription" TEXT NOT NULL,
        "UserID" INTEGER NOT NULL,
        "ReturnType" TEXT,
        "TotalAmount" INTEGER NOT NULL,
        "ClientID" INTEGER DEFAULT 1,
        "SupplierID" INTEGER,
        CONSTRAINT "Return_pkey" PRIMARY KEY ("ReturnID")
    );

-- CreateTable
CREATE TABLE
    "StockLevel" (
        "ID" SERIAL NOT NULL,
        "ProductID" INTEGER NOT NULL,
        "CurrentStock" INTEGER NOT NULL,
        "LastUpdate" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "StockLevel_pkey" PRIMARY KEY ("ID")
    );

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User" ("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_Phone_key" ON "Supplier" ("Phone");

-- CreateIndex
CREATE UNIQUE INDEX "Client_Phone_key" ON "Client" ("Phone");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_SupplierID_fkey" FOREIGN KEY ("SupplierID") REFERENCES "Supplier" ("SupplierID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User" ("UserID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_clientClientID_fkey" FOREIGN KEY ("clientClientID") REFERENCES "Client" ("ClientID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Supplier" ADD CONSTRAINT "Supplier_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User" ("UserID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User" ("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchases" ADD CONSTRAINT "Purchases_ClientID_fkey" FOREIGN KEY ("ClientID") REFERENCES "Client" ("ClientID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchases" ADD CONSTRAINT "Purchases_ProductID_fkey" FOREIGN KEY ("ProductID") REFERENCES "Product" ("ProductID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchases" ADD CONSTRAINT "Purchases_SupplierID_fkey" FOREIGN KEY ("SupplierID") REFERENCES "Supplier" ("SupplierID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchases" ADD CONSTRAINT "Purchases_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User" ("UserID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_ProductID_fkey" FOREIGN KEY ("ProductID") REFERENCES "Product" ("ProductID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User" ("UserID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_ClientID_fkey" FOREIGN KEY ("ClientID") REFERENCES "Client" ("ClientID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockTransaction" ADD CONSTRAINT "StockTransaction_ProductID_fkey" FOREIGN KEY ("ProductID") REFERENCES "Product" ("ProductID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Return" ADD CONSTRAINT "Return_ClientID_fkey" FOREIGN KEY ("ClientID") REFERENCES "Client" ("ClientID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Return" ADD CONSTRAINT "Return_ProductID_fkey" FOREIGN KEY ("ProductID") REFERENCES "Product" ("ProductID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Return" ADD CONSTRAINT "Return_SaleID_fkey" FOREIGN KEY ("SaleID") REFERENCES "Sale" ("SaleID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Return" ADD CONSTRAINT "Return_Supplier_fkey" FOREIGN KEY ("SupplierID") REFERENCES "Supplier" ("SupplierID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Return" ADD CONSTRAINT "Return_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User" ("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockLevel" ADD CONSTRAINT "StockLevel_ProductID_fkey" FOREIGN KEY ("ProductID") REFERENCES "Product" ("ProductID") ON DELETE RESTRICT ON UPDATE CASCADE;
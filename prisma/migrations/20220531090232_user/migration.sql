-- CreateEnum
CREATE TYPE "DisplayMode" AS ENUM ('LIST', 'GRID');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "emali" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "displayMode" "DisplayMode" NOT NULL DEFAULT E'LIST',
    "darkMode" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_emali_key" ON "User"("emali");

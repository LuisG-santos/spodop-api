/*
  Warnings:

  - You are about to alter the column `dose` on the `Application` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(8,2)`.
  - You are about to alter the column `area` on the `Field` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `latitude` on the `Field` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(9,6)`.
  - You are about to alter the column `longitude` on the `Field` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(9,6)`.
  - You are about to alter the column `totalArea` on the `Ownership` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `longitude` on the `Ownership` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(9,6)`.
  - You are about to alter the column `latitude` on the `Ownership` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(9,6)`.

*/
-- AlterTable
ALTER TABLE "Application" ALTER COLUMN "dose" SET DATA TYPE DECIMAL(8,2);

-- AlterTable
ALTER TABLE "Field" ALTER COLUMN "area" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "latitude" SET DATA TYPE DECIMAL(9,6),
ALTER COLUMN "longitude" SET DATA TYPE DECIMAL(9,6);

-- AlterTable
ALTER TABLE "Ownership" ALTER COLUMN "totalArea" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "longitude" SET DATA TYPE DECIMAL(9,6),
ALTER COLUMN "latitude" SET DATA TYPE DECIMAL(9,6);

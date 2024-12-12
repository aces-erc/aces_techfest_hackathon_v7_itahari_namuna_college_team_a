/*
  Warnings:

  - Added the required column `phone` to the `INSURANCE_COMPANY` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `INSURANCE_COMPANY` ADD COLUMN `phone` VARCHAR(191) NOT NULL;

/*
  Warnings:

  - Added the required column `password` to the `Hospital` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Hospital` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `hospital` ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;

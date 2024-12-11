/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Hospital` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Hospital_username_key` ON `Hospital`(`username`);

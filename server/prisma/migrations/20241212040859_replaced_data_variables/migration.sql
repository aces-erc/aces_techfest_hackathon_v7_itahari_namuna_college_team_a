/*
  Warnings:

  - You are about to alter the column `bloodPressure` on the `healthrecord` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.
  - You are about to alter the column `sugarLevel` on the `healthrecord` table. The data in that column could be lost. The data in that column will be cast from `LongText` to `Int`.

*/
-- AlterTable
ALTER TABLE `healthrecord` MODIFY `bloodPressure` JSON NULL,
    MODIFY `sugarLevel` INTEGER NULL;

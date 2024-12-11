/*
  Warnings:

  - You are about to drop the column `hosppital_address` on the `Hospital` table. All the data in the column will be lost.
  - You are about to drop the column `iNSURANCE_COMPANYId` on the `Patients` table. All the data in the column will be lost.
  - The values [USER] on the enum `Patients_role` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `hospital_address` to the `Hospital` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Patients` DROP FOREIGN KEY `Patients_iNSURANCE_COMPANYId_fkey`;

-- AlterTable
ALTER TABLE `Hospital` DROP COLUMN `hosppital_address`,
    ADD COLUMN `hospital_address` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Patients` DROP COLUMN `iNSURANCE_COMPANYId`,
    MODIFY `role` ENUM('HOSPITAL', 'PATIENTS', 'DOCTOR', 'INSURANCE_COMPANY') NOT NULL;

-- CreateTable
CREATE TABLE `HealthRecord` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patients_id` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `bloodPressure` VARCHAR(191) NOT NULL,
    `sugarLevel` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Patients` ADD CONSTRAINT `Patients_insurance_company_id_fkey` FOREIGN KEY (`insurance_company_id`) REFERENCES `INSURANCE_COMPANY`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HealthRecord` ADD CONSTRAINT `HealthRecord_patients_id_fkey` FOREIGN KEY (`patients_id`) REFERENCES `Patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `patients_id` on the `HealthRecord` table. All the data in the column will be lost.
  - You are about to drop the `Patients` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user_id` to the `HealthRecord` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `HealthRecord` DROP FOREIGN KEY `HealthRecord_patients_id_fkey`;

-- DropForeignKey
ALTER TABLE `Patients` DROP FOREIGN KEY `Patients_insurance_company_id_fkey`;

-- AlterTable
ALTER TABLE `HealthRecord` DROP COLUMN `patients_id`,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `Patients`;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `dob` DATETIME(3) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE', 'OTHER') NOT NULL,
    `role` ENUM('HOSPITAL', 'PATIENTS', 'DOCTOR', 'INSURANCE_COMPANY') NOT NULL DEFAULT 'PATIENTS',
    `email` VARCHAR(191) NULL,
    `address` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `balance` INTEGER NOT NULL,
    `insurance_company_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_insurance_company_id_fkey` FOREIGN KEY (`insurance_company_id`) REFERENCES `INSURANCE_COMPANY`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HealthRecord` ADD CONSTRAINT `HealthRecord_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE `healthrecord` ADD COLUMN `description` VARCHAR(191) NULL,
    MODIFY `bloodPressure` VARCHAR(191) NULL,
    MODIFY `sugarLevel` DOUBLE NULL;

-- AlterTable
ALTER TABLE `hospital` ADD COLUMN `role` ENUM('HOSPITAL', 'PATIENTS', 'DOCTOR', 'INSURANCE_COMPANY') NOT NULL DEFAULT 'HOSPITAL';

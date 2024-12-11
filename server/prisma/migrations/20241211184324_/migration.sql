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
    `password` VARCHAR(191) NOT NULL,
    `insurance_company_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HealthRecord` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `bloodPressure` VARCHAR(191) NOT NULL,
    `sugarLevel` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hospital` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hospital_name` VARCHAR(191) NOT NULL,
    `hospital_address` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Doctor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `hospital_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Doctor_username_key`(`username`),
    UNIQUE INDEX `Doctor_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `INSURANCE_COMPANY` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `company_name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('HOSPITAL', 'PATIENTS', 'DOCTOR', 'INSURANCE_COMPANY') NOT NULL DEFAULT 'INSURANCE_COMPANY',

    UNIQUE INDEX `INSURANCE_COMPANY_company_name_key`(`company_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_HospitalInsuranceCompanies` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_HospitalInsuranceCompanies_AB_unique`(`A`, `B`),
    INDEX `_HospitalInsuranceCompanies_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_insurance_company_id_fkey` FOREIGN KEY (`insurance_company_id`) REFERENCES `INSURANCE_COMPANY`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HealthRecord` ADD CONSTRAINT `HealthRecord_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Doctor` ADD CONSTRAINT `Doctor_hospital_id_fkey` FOREIGN KEY (`hospital_id`) REFERENCES `Hospital`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_HospitalInsuranceCompanies` ADD CONSTRAINT `_HospitalInsuranceCompanies_A_fkey` FOREIGN KEY (`A`) REFERENCES `Hospital`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_HospitalInsuranceCompanies` ADD CONSTRAINT `_HospitalInsuranceCompanies_B_fkey` FOREIGN KEY (`B`) REFERENCES `INSURANCE_COMPANY`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

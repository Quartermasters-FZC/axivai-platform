-- CreateTable
CREATE TABLE `GapReport` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `organizationType` ENUM('SCHOOL_DISTRICT', 'FLEET_OPERATOR', 'CONSTRUCTION', 'INDUSTRIAL', 'PORT_LOGISTICS', 'UTILITY', 'GOVERNMENT', 'EMERGENCY_MANAGEMENT', 'CONSULTANT', 'OTHER') NOT NULL,
    `organizationName` VARCHAR(200) NULL,
    `role` VARCHAR(120) NULL,
    `contactName` VARCHAR(120) NULL,
    `email` VARCHAR(254) NULL,
    `followUpConsent` BOOLEAN NOT NULL DEFAULT false,
    `state` CHAR(2) NOT NULL,
    `city` VARCHAR(120) NULL,
    `problemType` ENUM('CONNECTION_DELAY', 'PEAK_CAPACITY', 'TEMPORARY_DEMAND', 'RESILIENCE_GAP', 'REMOTE_LOAD', 'NOT_SURE') NOT NULL,
    `application` VARCHAR(80) NOT NULL,
    `description` TEXT NOT NULL,
    `peakKw` INTEGER NULL,
    `dailyKwh` INTEGER NULL,
    `durationNeeded` ENUM('DAYS', 'WEEKS', 'MONTHS', 'ONE_TO_TWO_YEARS', 'MORE_THAN_TWO_YEARS', 'UNKNOWN') NULL,
    `utilityDelay` ENUM('NONE', 'UNDER_6_MONTHS', 'SIX_TO_12_MONTHS', 'ONE_TO_2_YEARS', 'MORE_THAN_2_YEARS', 'UNKNOWN') NULL,
    `currentApproach` TEXT NULL,
    `costOfDelay` TEXT NULL,
    `ipHash` CHAR(64) NULL,

    INDEX `GapReport_createdAt_idx`(`createdAt`),
    INDEX `GapReport_state_idx`(`state`),
    INDEX `GapReport_problemType_idx`(`problemType`),
    INDEX `GapReport_ipHash_createdAt_idx`(`ipHash`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


-- CreateTable
CREATE TABLE `category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(32) NOT NULL,
    `label` VARCHAR(64) NOT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `category_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stone` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(80) NOT NULL,
    `origin` VARCHAR(120) NULL,
    `description` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `stone_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(64) NOT NULL,
    `title` VARCHAR(160) NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `alt` TEXT NOT NULL,
    `location` VARCHAR(120) NULL,
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `categoryId` INTEGER NOT NULL,
    `stoneId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `project_slug_key`(`slug`),
    INDEX `project_categoryId_idx`(`categoryId`),
    INDEX `project_stoneId_idx`(`stoneId`),
    INDEX `project_featured_idx`(`featured`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `service` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(160) NOT NULL,
    `summary` TEXT NOT NULL,
    `body` TEXT NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `alt` TEXT NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `service_categoryId_key`(`categoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `service_include` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(255) NOT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `serviceId` INTEGER NOT NULL,

    INDEX `service_include_serviceId_idx`(`serviceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `service_stone` (
    `serviceId` INTEGER NOT NULL,
    `stoneId` INTEGER NOT NULL,

    INDEX `service_stone_stoneId_idx`(`stoneId`),
    PRIMARY KEY (`serviceId`, `stoneId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contact_request` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(80) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `email` VARCHAR(120) NULL,
    `message` TEXT NOT NULL,
    `categoryId` INTEGER NULL,
    `status` ENUM('NEW', 'CONTACTED', 'QUOTED', 'WON', 'LOST') NOT NULL DEFAULT 'NEW',
    `emailSent` BOOLEAN NOT NULL DEFAULT false,
    `emailError` TEXT NULL,
    `note` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `contact_request_status_idx`(`status`),
    INDEX `contact_request_createdAt_idx`(`createdAt`),
    INDEX `contact_request_categoryId_idx`(`categoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `project` ADD CONSTRAINT `project_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project` ADD CONSTRAINT `project_stoneId_fkey` FOREIGN KEY (`stoneId`) REFERENCES `stone`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `service` ADD CONSTRAINT `service_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `service_include` ADD CONSTRAINT `service_include_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `service`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `service_stone` ADD CONSTRAINT `service_stone_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `service`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `service_stone` ADD CONSTRAINT `service_stone_stoneId_fkey` FOREIGN KEY (`stoneId`) REFERENCES `stone`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contact_request` ADD CONSTRAINT `contact_request_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

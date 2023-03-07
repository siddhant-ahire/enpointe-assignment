-- CreateTable
CREATE TABLE `Warehouses` (
    `warehouse_id` CHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `unique_code` INTEGER NULL,
    `status` VARCHAR(255) NOT NULL DEFAULT 'inactive',
    `capacity` INTEGER NOT NULL DEFAULT 0,
    `total_capacity` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`warehouse_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sections` (
    `section_id` CHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `capacity` INTEGER NOT NULL DEFAULT 0,
    `warehouse_id` CHAR(36) NOT NULL,
    `is_deleted` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`section_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

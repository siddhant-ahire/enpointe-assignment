-- AddForeignKey
ALTER TABLE `Sections` ADD CONSTRAINT `Sections_warehouse_id_fkey` FOREIGN KEY (`warehouse_id`) REFERENCES `Warehouses`(`warehouse_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Categories`(`category_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_section_id_fkey` FOREIGN KEY (`section_id`) REFERENCES `Sections`(`section_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

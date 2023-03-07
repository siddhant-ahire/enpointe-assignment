/*
  Warnings:

  - The primary key for the `Sections` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `section_i` on the `Sections` table. All the data in the column will be lost.
  - Added the required column `section_id` to the `Sections` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Sections` DROP PRIMARY KEY,
    DROP COLUMN `section_i`,
    ADD COLUMN `section_id` CHAR(36) NOT NULL,
    ADD PRIMARY KEY (`section_id`);

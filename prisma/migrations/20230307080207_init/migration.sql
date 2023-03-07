/*
  Warnings:

  - The primary key for the `Sections` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `section_id` on the `Sections` table. All the data in the column will be lost.
  - Added the required column `section_i` to the `Sections` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Sections` DROP PRIMARY KEY,
    DROP COLUMN `section_id`,
    ADD COLUMN `section_i` CHAR(36) NOT NULL,
    ADD PRIMARY KEY (`section_i`);

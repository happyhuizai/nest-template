/*
  Warnings:

  - You are about to drop the column `conditions` on the `Policy` table. All the data in the column will be lost.
  - You are about to drop the column `fields` on the `Policy` table. All the data in the column will be lost.
  - You are about to drop the column `inverted` on the `Policy` table. All the data in the column will be lost.
  - You are about to drop the column `reason` on the `Policy` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Policy` DROP COLUMN `conditions`,
    DROP COLUMN `fields`,
    DROP COLUMN `inverted`,
    DROP COLUMN `reason`;

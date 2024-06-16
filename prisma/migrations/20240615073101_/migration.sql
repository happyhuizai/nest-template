/*
  Warnings:

  - You are about to drop the `GroupRole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PermissionMenu` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PermissionPolicy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PermissionRole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserGroup` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `GroupRole` DROP FOREIGN KEY `GroupRole_groupId_fkey`;

-- DropForeignKey
ALTER TABLE `GroupRole` DROP FOREIGN KEY `GroupRole_roleId_fkey`;

-- DropForeignKey
ALTER TABLE `PermissionMenu` DROP FOREIGN KEY `PermissionMenu_menuId_fkey`;

-- DropForeignKey
ALTER TABLE `PermissionMenu` DROP FOREIGN KEY `PermissionMenu_permissionId_fkey`;

-- DropForeignKey
ALTER TABLE `PermissionPolicy` DROP FOREIGN KEY `PermissionPolicy_permissionId_fkey`;

-- DropForeignKey
ALTER TABLE `PermissionPolicy` DROP FOREIGN KEY `PermissionPolicy_ruleId_fkey`;

-- DropForeignKey
ALTER TABLE `PermissionRole` DROP FOREIGN KEY `PermissionRole_permissionId_fkey`;

-- DropForeignKey
ALTER TABLE `PermissionRole` DROP FOREIGN KEY `PermissionRole_roleId_fkey`;

-- DropForeignKey
ALTER TABLE `UserGroup` DROP FOREIGN KEY `UserGroup_groupId_fkey`;

-- DropForeignKey
ALTER TABLE `UserGroup` DROP FOREIGN KEY `UserGroup_userId_fkey`;

-- DropTable
DROP TABLE `GroupRole`;

-- DropTable
DROP TABLE `PermissionMenu`;

-- DropTable
DROP TABLE `PermissionPolicy`;

-- DropTable
DROP TABLE `PermissionRole`;

-- DropTable
DROP TABLE `UserGroup`;

-- CreateTable
CREATE TABLE `_GroupToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_GroupToUser_AB_unique`(`A`, `B`),
    INDEX `_GroupToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_GroupToRole` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_GroupToRole_AB_unique`(`A`, `B`),
    INDEX `_GroupToRole_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PermissionToRole` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PermissionToRole_AB_unique`(`A`, `B`),
    INDEX `_PermissionToRole_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PermissionToPolicy` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PermissionToPolicy_AB_unique`(`A`, `B`),
    INDEX `_PermissionToPolicy_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_MenuToPermission` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_MenuToPermission_AB_unique`(`A`, `B`),
    INDEX `_MenuToPermission_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_GroupToUser` ADD CONSTRAINT `_GroupToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Group`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GroupToUser` ADD CONSTRAINT `_GroupToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GroupToRole` ADD CONSTRAINT `_GroupToRole_A_fkey` FOREIGN KEY (`A`) REFERENCES `Group`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GroupToRole` ADD CONSTRAINT `_GroupToRole_B_fkey` FOREIGN KEY (`B`) REFERENCES `Role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PermissionToRole` ADD CONSTRAINT `_PermissionToRole_A_fkey` FOREIGN KEY (`A`) REFERENCES `Permission`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PermissionToRole` ADD CONSTRAINT `_PermissionToRole_B_fkey` FOREIGN KEY (`B`) REFERENCES `Role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PermissionToPolicy` ADD CONSTRAINT `_PermissionToPolicy_A_fkey` FOREIGN KEY (`A`) REFERENCES `Permission`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PermissionToPolicy` ADD CONSTRAINT `_PermissionToPolicy_B_fkey` FOREIGN KEY (`B`) REFERENCES `Policy`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MenuToPermission` ADD CONSTRAINT `_MenuToPermission_A_fkey` FOREIGN KEY (`A`) REFERENCES `Menu`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MenuToPermission` ADD CONSTRAINT `_MenuToPermission_B_fkey` FOREIGN KEY (`B`) REFERENCES `Permission`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `Authenticator` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Authenticator` DROP FOREIGN KEY `Authenticator_userId_fkey`;

-- AlterTable
ALTER TABLE `users` MODIFY `email` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `Authenticator`;

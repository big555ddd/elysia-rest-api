/*
  Warnings:

  - Added the required column `description` to the `permission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_actived` to the `permission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "permission" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "is_actived" BOOLEAN NOT NULL;

/*
  Warnings:

  - The `created_at` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updated_at` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `deleted_at` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "user" ALTER COLUMN "username" SET DATA TYPE TEXT,
ALTER COLUMN "password" SET DATA TYPE TEXT,
ALTER COLUMN "first_name" SET DATA TYPE TEXT,
ALTER COLUMN "last_name" SET DATA TYPE TEXT,
DROP COLUMN "created_at",
ADD COLUMN     "created_at" BIGINT NOT NULL DEFAULT 0,
DROP COLUMN "updated_at",
ADD COLUMN     "updated_at" BIGINT NOT NULL DEFAULT 0,
DROP COLUMN "deleted_at",
ADD COLUMN     "deleted_at" BIGINT;

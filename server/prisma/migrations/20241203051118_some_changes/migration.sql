/*
  Warnings:

  - You are about to drop the column `type` on the `resources` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `roles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "resources" DROP COLUMN "type";

-- AlterTable
ALTER TABLE "roles" DROP COLUMN "description";

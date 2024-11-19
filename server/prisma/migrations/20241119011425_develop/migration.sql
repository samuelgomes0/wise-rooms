/*
  Warnings:

  - You are about to drop the column `bookingDate` on the `bookings` table. All the data in the column will be lost.
  - Added the required column `date` to the `bookings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "bookingDate",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

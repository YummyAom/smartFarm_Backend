/*
  Warnings:

  - You are about to drop the column `type` on the `Actuator` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Sensor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Actuator" DROP COLUMN "type";

-- AlterTable
ALTER TABLE "Sensor" DROP COLUMN "type";

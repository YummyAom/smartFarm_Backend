/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Sensor` will be added. If there are existing duplicate values, this will fail.
  - Made the column `thresholdMax` on table `Sensor` required. This step will fail if there are existing NULL values in that column.
  - Made the column `thresholdMin` on table `Sensor` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Sensor" ADD COLUMN     "unit" TEXT NOT NULL DEFAULT 'unknow',
ALTER COLUMN "thresholdMax" SET NOT NULL,
ALTER COLUMN "thresholdMax" SET DEFAULT 0,
ALTER COLUMN "thresholdMin" SET NOT NULL,
ALTER COLUMN "thresholdMin" SET DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Sensor_name_key" ON "Sensor"("name");

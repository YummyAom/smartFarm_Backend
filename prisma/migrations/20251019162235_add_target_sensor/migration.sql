/*
  Warnings:

  - The primary key for the `SensorReading` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `UserConfig` table. If the table is not empty, all the data it contains will be lost.
  - The required column `id` was added to the `SensorReading` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Sensor" ADD COLUMN     "target" DOUBLE PRECISION,
ALTER COLUMN "unit" SET DEFAULT 'unknown';

-- AlterTable
ALTER TABLE "SensorReading" DROP CONSTRAINT "SensorReading_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "SensorReading_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "public"."UserConfig";

-- DropEnum
DROP TYPE "public"."Device";

-- DropEnum
DROP TYPE "public"."SensorType";

-- CreateTable
CREATE TABLE "PIDConfig" (
    "id" TEXT NOT NULL,
    "actuatorId" TEXT NOT NULL,
    "kp" DOUBLE PRECISION NOT NULL,
    "ki" DOUBLE PRECISION NOT NULL,
    "kd" DOUBLE PRECISION NOT NULL,
    "setpoint" DOUBLE PRECISION NOT NULL,
    "outputMin" DOUBLE PRECISION,
    "outputMax" DOUBLE PRECISION,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PIDConfig_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PIDConfig_actuatorId_key" ON "PIDConfig"("actuatorId");

-- AddForeignKey
ALTER TABLE "SensorReading" ADD CONSTRAINT "SensorReading_sensorId_fkey" FOREIGN KEY ("sensorId") REFERENCES "Sensor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PIDConfig" ADD CONSTRAINT "PIDConfig_actuatorId_fkey" FOREIGN KEY ("actuatorId") REFERENCES "Actuator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

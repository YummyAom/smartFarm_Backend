import express from "express";
import { PrismaService } from "./infrastructure/databases/prisma/prisma.service";
import { config } from "./infrastructure/env/config";
import createApp from "./app";
import { EMQXClient } from "./infrastructure/mqtt/mqttClient";
import { SysnService } from "./sysService";
import { SensorService } from "./services/sensor.service";
import { PrismaSensorRepository } from "./infrastructure/databases/prismaSensorRepo";
import { DeviceService } from "./services/device.service";
const app = createApp();
const prismaService = new PrismaService();

const mqttClient = new EMQXClient();
const sensorRepo = new PrismaSensorRepository();
const sensorService = new SensorService(sensorRepo);
const deviceService = new DeviceService();
const sysnService = new SysnService(sensorService, deviceService);

async function startServer() {
  try {
    await prismaService.connectDB();

    const waitForMQTT = () => new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => reject("MQTT connection timeout"), 5000);

      const checkConnected = () => {
        if (mqttClient.isReady()) {
          clearTimeout(timeout);
          console.log("MQTT is ready, starting server...");
          resolve();
        } else {
          setTimeout(checkConnected, 100);
        }
      };

      checkConnected();
    });

    await waitForMQTT();

    sysnService.broadcastAllStates();

    const port = config?.app?.port ?? 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Cannot start server:", error);
    process.exit(1);
  }
}


startServer();

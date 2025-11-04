import { Router } from "express";
import { SensorController } from "../controllers/sensor.controller";
import { PrismaSensorRepository } from "../infrastructure/databases/prismaSensorRepo";
import { SensorService } from "../services/sensor.service";
import { MqttService } from "../services/mqtt.service";
import { EMQXClient } from "../infrastructure/mqtt/mqttClient";
const router = Router();

const repo = new PrismaSensorRepository();
const mqtt = new MqttService(new EMQXClient());
const service = new SensorService(repo, mqtt);
const controller = new SensorController(service, mqtt);

router.get("/", controller.getAll);
router.post("/", controller.create);
router.put("/config", controller.updateTarget);
router.put("/", service.updateNameSensor);

export default router;

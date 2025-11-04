import { Router } from "express";
import { PrismaSensorRepository } from "../infrastructure/databases/prismaSensorRepo";
import { DeviceController } from "../controllers/device.controller";
import { DeviceService } from "../services/device.service";
const router = Router();

const service = new DeviceService();
const contorller = new DeviceController(service);

router.get("/hello", contorller.getHello);
router.get("/", contorller.getAll)
router.post("/", contorller.createDevice);
router.post("/state", contorller.changeDeviceState);
export default router;

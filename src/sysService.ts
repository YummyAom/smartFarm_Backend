import { SensorService } from "./services/sensor.service";
import { DeviceService } from "./services/device.service";

export class SysnService {
    constructor(
        private sensorService: SensorService,
        private deviceService: DeviceService,
    ) { }

    async broadcastAllStates() {
        try {
            console.log("🔁 Broadcasting all sensor & device states...");
            await this.sensorService.broadcastAllsensor();
            await this.deviceService.broadcastAllDevice();
            console.log("✅ Broadcast complete: sensor + device states published.");
        } catch (error) {
            console.error("❌ Failed to broadcast states:", error);
        }

    }
}
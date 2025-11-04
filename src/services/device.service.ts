import { PrismaService } from "../infrastructure/databases/pisma/prisma.service";
import { MqttService } from "./mqtt.service";
import { EMQXClient } from "../infrastructure/mqtt/mqttClient";
export class DeviceService {
    constructor(
        private prisma = new PrismaService(),
        private mqtt = new MqttService(new EMQXClient())
    ) { }

    async addDevice(data: { name: string }) {
        return this.prisma.actuator.create({ data: { name: data.name } });
    }

    async getDevices() {
        return this.prisma.actuator.findMany({ select: { id: true, name: true, isActive: true } });
    }

    async toggleDeviceState(id: string) {
        console.log(id);
        const device = await this.prisma.actuator.findUnique({ where: { id } });
        if (!device) throw new Error("Device not found");

        const newState = !device.isActive;

        const updatedDevice = await this.prisma.actuator.update({
            where: { id },
            data: { isActive: newState },
        });

        await this.mqtt.publishDeviceState(updatedDevice.name, updatedDevice.isActive);
        await this.broadcastAllDevice();
        return updatedDevice;
    }

    async broadcastAllDevice() {
        const devices = await this.getDevices();
        const configPayload = devices.map(device => ({
            id: device.id,
            name: device.name,
            state: device.isActive
        }));
        await this.mqtt.publishDeviceAllState(configPayload);
    }
}

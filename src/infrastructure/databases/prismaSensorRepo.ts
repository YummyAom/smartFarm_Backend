import prisma from "./pisma/prisma";
import { SensorRepository } from "../../domain/sensorRepository";
import { Sensor, SensorConfig } from "../../domain/sensor";
import { promises } from "dns";
import { DeviceState } from "../../domain/deivce";

export class PrismaSensorRepository implements SensorRepository {
    async findAll(): Promise<Sensor[]> {
        return prisma.sensor.findMany();
    }
    async findById(id: string): Promise<Sensor | null> {
        return prisma.sensor.findUnique({ where: { id } });
    }

    async findByName(name: string): Promise<Sensor | null> {
        return prisma.sensor.findUnique({ where: { name } });
    }

    async create(sensor: Sensor): Promise<Sensor> {
        return prisma.sensor.create({ data: sensor });
    }

    async updateTarget(data: SensorConfig): Promise<SensorConfig> {
        return await prisma.sensor.update({
            where: { id: data.id },
            data: { target: data.target },
            select: {
                id: true,
                name: true,
                target: true
            }
        });
    }

    async updateSensor(data: { id: string, name: string, target?: number | null }) {
        const updateData: any = {};
        if (data.name !== undefined) updateData.name = data.name;
        if (data.target !== undefined) updateData.target = data.target;

        return await prisma.sensor.update({
            where: { id: data.id },
            data: updateData
        });
    }
}
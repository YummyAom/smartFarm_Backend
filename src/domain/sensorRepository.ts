import { promises } from "dns";
import { Sensor, SensorConfig } from "./sensor"

export interface SensorRepository {
    findAll(): Promise<Sensor[]>;
    findById(id: string): Promise<Sensor | null>;
    findByName(name: string): Promise<Sensor | null>;
    create(sensor: Sensor): Promise<Sensor>;
    updateTarget(data: SensorConfig): Promise<SensorConfig>;
    updateSensor(data: { id: string, name: string, target?: number | null }): Promise<Sensor>;
    // updateSensor(id: string, name: string): Promise<Sensor>;
}
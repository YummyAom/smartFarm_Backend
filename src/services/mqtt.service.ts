// src/application/usecases/SetSensorConfigUseCase.ts
import { EMQXClient } from "../infrastructure/mqtt/mqttClient";
import { SensorConfig } from "../domain/sensor";
import { config } from "dotenv";

export class MqttService {
    constructor(private mqttClient: EMQXClient) { }

    async publishDeviceState(name: string, state: boolean) {
        this.mqttClient.publish(`device/${name}/state`, { state });
    }

    async publishDeviceAllState(configPayload: { id: string; name: string; state: boolean }[]) {
        const payloadString = configPayload;
        this.mqttClient.publish("device/config", payloadString);
    }

    async publishSensorConfig(data: SensorConfig) {
        this.mqttClient.publish(`sensor/${data.name}/config`, data.target);
    }

    async publishSensorAllConfig(configPayload: {
        id: string,
        name: string,
        // min: number | null,
        // max: number | null,
        target: number | null
    }[]) {
        this.mqttClient.publish(`sensors/config`, configPayload);
        console.log(configPayload);
    }

}

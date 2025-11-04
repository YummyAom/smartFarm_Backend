import { SensorRepository } from "../domain/sensorRepository";
import { Sensor, SensorConfig } from "../domain/sensor";
import { MqttService } from "./mqtt.service";
import { EMQXClient } from "../infrastructure/mqtt/mqttClient";

export class SensorService {
  constructor(
    private sensorRepo: SensorRepository,
    private mqtt = new MqttService(new EMQXClient())
  ) { }

  async getAllSensors() {
    return this.sensorRepo.findAll();
  }

  async getSensorById(id: string) {
    const sensor = await this.sensorRepo.findById(id);
    if (!sensor) throw new Error("Sensor not found");
    return sensor;
  }

  async createSensor(data: Sensor) {
    if (
      data.thresholdMin !== undefined &&
      data.thresholdMax !== undefined &&
      data.thresholdMin > data.thresholdMax
    ) {
      throw new Error("thresholdMin must be less than thresholdMax");
    }

    const existing = await this.sensorRepo.findByName(data.name);
    if (existing) {
      throw new Error(`Sensor '${data.name}' already exists`);
    }

    const sensor: Sensor = {
      id: data.id,
      name: data.name,
      unit: data.unit,
      target: data.target,
      thresholdMin: data.thresholdMin,
      thresholdMax: data.thresholdMax,
    };

    return this.sensorRepo.create(sensor);
  }

  async changeTarget(data: SensorConfig) {

    const sensor = await this.sensorRepo.findById(data.id);
    if (!sensor) throw new Error("Sensor not found");

    const updatedSensor = await this.sensorRepo.updateTarget(data);

    await this.broadcastAllsensor();

    return updatedSensor;
  }

  async broadcastAllsensor() {
    const sensors = await this.getAllSensors();
    const configPayload = sensors.map(sensor => ({
      id: sensor.id,
      name: sensor.name,
      target: sensor.target
    }))

    await this.mqtt.publishSensorAllConfig(configPayload);
  }

  async updateNameSensor(data: {
    id: string,
    name: string,
    target: number | null
  }) {
    const sensor = await this.sensorRepo.updateSensor(data);
    return sensor;
  }

}

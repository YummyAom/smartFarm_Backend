import { Request, Response } from "express";
import { SensorService } from "../services/sensor.service";
import { MqttService } from "../services/mqtt.service";
import { SensorConfig } from "../domain/sensor";

export class SensorController {
  constructor(
    private sensorService: SensorService,
    private SensorConfig: MqttService
  ) { }

  getAll = async (req: Request, res: Response) => {
    try {
      const sensors = await this.sensorService.getAllSensors();
      res.status(201).json(sensors);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const sensor = await this.sensorService.createSensor(req.body);
      res.status(201).json(sensor);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };

  updateTarget = async (req: Request, res: Response) => {
    try {
      const config: SensorConfig = req.body;
      const senser = await this.sensorService.changeTarget(config);
      res.status(201).json(senser);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };

  updataSensor = async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const sensor = await this.sensorService.updateNameSensor(data);
      res.status(201).json(sensor);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

}

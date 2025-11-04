import { Request, Response } from "express";
import { DeviceState } from "../domain/deivce"
import { DeviceService } from "../services/device.service";

export class DeviceController {
    constructor(private deviceService: DeviceService) { }

    createDevice = async (req: Request<{}, {}, DeviceState>, res: Response) => {
        try {
            const data = req.body;
            const device = await this.deviceService.addDevice({ name: data.name });
            res.status(201).json(device);
        } catch (error) {
            console.error("Error creating device:", error);
            res.status(500).json({ message: "Failed to create device" });
        }
    };

    getHello = async (req: Request, res: Response) => {
        res.status(200).json("Hello from DeviceController");
    };

    getAll = async (req: Request, res: Response) => {
        try {
            const devices = await this.deviceService.getDevices();
            res.status(200).json(devices);
        } catch (error) {
            console.error("Error fetching devices:", error);
            res.status(500).json({ message: "Failed to fetch devices" });
        }
    };

    changeDeviceState = async (req: Request, res: Response) => {
        try {
            const { id } = req.body;
            const updatedDevice = await this.deviceService.toggleDeviceState(id);
            res.status(200).json(updatedDevice);
        } catch (error) {
            console.error("Error toggling device state:", error);
            res.status(500).json({ message: "Failed to change device state" });
        }
    };

}

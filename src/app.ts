import express, { Request, Response } from "express";
import cors from "cors";
import sensorRouter from "./router/sensor.routes";
import deviceRouter from "./router/devices.routes";

const createApp = () => {
  const app = express();

  // ✅ CORS
  app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
  }));

  // ✅ Body parsing
  app.use(express.json());

  // Test route
  app.get("/", (req: Request, res: Response) => {
    res.send("Server is running!");
  });

  // Routers
  app.use("/sensors", sensorRouter);
  app.use("/devices", deviceRouter);

  return app;
};

export default createApp;

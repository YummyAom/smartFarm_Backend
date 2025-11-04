import dotenv from "dotenv"

dotenv.config();

export const config = {
    app: {
        port: process.env.BACKENDPORT
    },
    db: {
        url: process.env.DB_URL
    },
    mqtt: {
        brokerUrl: process.env.MQTT_BROKER_URL ?? "mqtt://localhost:1883",
        username: process.env.MQTT_USERNAME ?? "guest",
        password: process.env.MQTT_PASSWORD ?? "guest",
    },
};


import mqtt, { MqttClient } from "mqtt";
import { config } from "../env/config";

export class EMQXClient {
    private client: MqttClient;
    private isConnected = false;

    constructor(
        brokerUrl: string = config.mqtt.brokerUrl,
        username: string = config.mqtt.username,
        password: string = config.mqtt.password
    ) {
        this.client = mqtt.connect(brokerUrl, { username, password });

        this.client.on("connect", () => {
            this.isConnected = true;
            console.log("✅ MQTT connected to broker:", brokerUrl);
        });

        this.client.on("error", (err) => {
            this.isConnected = false;
            console.error("❌ MQTT connection error:", err);
        });

        this.client.on("close", () => {
            this.isConnected = false;
            console.log("⚠️ MQTT connection closed");
        });
    }

    publish(topic: string, payload: any) {
        if (!this.isConnected) {
            console.warn(`⚠️ Cannot publish, MQTT not connected yet. Topic: ${topic}`);
            return;
        }

        const msg = typeof payload === "string" ? payload : JSON.stringify(payload);

        this.client.publish(topic, msg, { qos: 0, retain: true }, (err) => {
            if (err) console.error("❌ Failed to publish MQTT message:", err);
            else console.log(`📤 Published to ${topic}: ${msg}`);
        });
    }

    subscribe(topic: string, handler: (message: any) => void) {
        this.client.subscribe(topic, { qos: 0 }, (err) => {
            if (err) console.error("❌ Subscribe failed:", err);
        });

        this.client.on("message", (recvTopic, message) => {
            if (recvTopic === topic) {
                try {
                    const payload = JSON.parse(message.toString());
                    handler(payload);
                } catch (err) {
                    console.error("❌ Failed to parse MQTT message:", err);
                }
            }
        });
    }

    isReady() {
        return this.isConnected;
    }
}

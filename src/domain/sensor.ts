export interface Sensor {
    id: string;
    name: string;
    unit: string;
    thresholdMin: number;
    thresholdMax: number;
    target: number | null;
}

export interface SensorConfig {
    id: string;
    name: String;
    target: number | null;
}
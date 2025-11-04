export interface DeviceRepository {
    updateStateById(id: string, isActive: boolean): Promise<void>;
}
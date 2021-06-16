export interface StorageAdapter {
    fetchAllAsync(): Promise<string[]>;
}

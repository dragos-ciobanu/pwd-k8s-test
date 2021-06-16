export interface StorageAdapter {
    fetchAll(): string[];
    save(data: string[]): void;
    append(data: string[]): void;
}

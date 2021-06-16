import {StorageAdapter} from "./StorageAdapter";

export class PasswordList
{
    private readonly storageAdapter: StorageAdapter;

    public constructor(storageAdapter: StorageAdapter) {
        this.storageAdapter = storageAdapter;
    }

    public findAsync(text: string): Promise<boolean> {
        return this.storageAdapter.fetchAllAsync().then((data: string[]) => {
            return data.indexOf(text) > -1;
        });

    }
}

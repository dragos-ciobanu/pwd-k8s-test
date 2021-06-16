import {ListProvider} from "./ListProvider";
import {StorageAdapter} from "./StorageAdapter";

export class PasswordList implements ListProvider
{
    private readonly storageAdapter: StorageAdapter;
    private readonly data: string[] = [];

    public constructor(storageAdapter: StorageAdapter) {
        this.storageAdapter = storageAdapter;
        this.data = this.storageAdapter.fetchAll();
        console.log(this.data);
    }

    isPasswordInLast10(text: string): boolean {
        const isPasswordFound: boolean = this.find(text);
        if (!isPasswordFound) {
            this.addPasswordToQueue(text);
        }

        return isPasswordFound;
    }

    find(text: string): boolean {
        return this.data.indexOf(text) > -1;
    }

    private addPasswordToQueue(text: string): void {
        if (this.data.length >= 10) {
            this.data.shift();
        }

        this.data.push(text);
        this.storageAdapter.save(this.data);
    }
}

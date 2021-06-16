import {StorageAdapter} from "./StorageAdapter";

const request = require("request");
const os = require("os");

export class HttpAdapter implements StorageAdapter {
    private readonly filePath: string;

    public constructor(filePath: string) {
        this.filePath = filePath;
    }

    public async fetchAllAsync(): Promise<string[]> {
        return await this.fetchContent().then((content: string) => {
            return content.split(os.EOL);
        });

    }

   private fetchContent(): Promise<string> {
        return new Promise((resolve, reject) => {
                request.get(this.filePath, (error: unknown, response: { statusCode: number; }, body: string) => {
                    if (error || response.statusCode != 200) {
                        reject(error || "Invalid status");
                    }

                    resolve(body);
                });
        });
    }
}

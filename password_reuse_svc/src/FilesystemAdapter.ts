import {StorageAdapter} from "./StorageAdapter";
const fs = require("fs");
const os = require("os");

export class FilesystemAdapter implements StorageAdapter {
    private readonly filePath: string;

    public constructor(filePath: string) {
        this.filePath = filePath;
        if(!fs.existsSync(this.filePath)) {
            try {
                fs.accessSync(this.filePath, fs.constants.F_OK | fs.constants.W_OK);
                fs.writeFileSync(this.filePath, "");
            } catch (err: unknown) {
                FilesystemAdapter.handleError(err);
            }
        }
    }

    public fetchAll(): string[] {
        try {
            const fileContent: string = fs.readFileSync(this.filePath, {encoding: 'utf8', flag:'r'});
            console.log(fileContent);
            return fileContent.split(os.EOL).filter((el: string) => el.length > 0);
        } catch (err: unknown) {
            FilesystemAdapter.handleError(err);
        }

        return [];
    }

    public save(data: string[]): void {
        try {
            const fileContent: string = data.join(os.EOL);
            fs.writeFileSync(this.filePath, fileContent,{encoding: 'utf8', flag:'w'});
        } catch (e: any) {
            console.log(e);
        }
    }

    public append(data: string[]): void {
        fs.appendFile(this.filePath, data.join(os.EOL) + os.EOL, FilesystemAdapter.handleError);
    }

    private static handleError(err: unknown): void {
        if (err) {
            console.log(err);
        }
    }
}

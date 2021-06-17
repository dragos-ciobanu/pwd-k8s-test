import express from 'express';
import {FilesystemAdapter} from "./FilesystemAdapter";
import {ListProvider} from "./ListProvider";
import {PasswordList} from "./PasswordList";

const app = express();
const port = process.env.PORT || 3003;


app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Password is being reused service');
});

app.post("/api/password/reuse", async (req, res, next) => {
    try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        const passwordText: string = req.body.password;

        const storageAdapter = new FilesystemAdapter("list.txt")
        const passwordListProvider: ListProvider = new PasswordList(storageAdapter);
        const isFound: boolean = passwordListProvider.isPasswordInLast10(passwordText);

        const response = {
            isReused: isFound
        };
        res.json(response);
    } catch (error) {
        next(error)
    }
});

app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
});


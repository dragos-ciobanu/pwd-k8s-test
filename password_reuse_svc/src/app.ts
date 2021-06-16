import express from 'express';
import {FilesystemAdapter} from "./FilesystemAdapter";
import {ListProvider} from "./ListProvider";
import {PasswordList} from "./PasswordList";

const app = express();
const port = 3000;


app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.get('/api/password/reuse/:password', (req, res) => {
    const passwordText: string = req.params.password;
    const storageAdapter = new FilesystemAdapter("list.txt")
    const passwordListProvider: ListProvider = new PasswordList(storageAdapter);
    const isFound: boolean = passwordListProvider.isPasswordInLast10(passwordText);
    res.send(`Score for ${passwordText} is: ${isFound}`);
});

app.get('/', (req, res) => {
    res.send('Password is being reused service');
});

app.post("/api/password/score", async (req, res, next) => {
    try {
        const passwordText: string = req.body.password;
        res.json({passwordText});
    } catch (error) {
        next(error)
    }
})

app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
});


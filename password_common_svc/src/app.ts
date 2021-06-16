import express from 'express';
import {HttpAdapter} from "./HttpAdapter";
import {PasswordList} from "./PasswordList";

const app = express();
const port = 3000;

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Password is common service');
});

app.get('/api/password/common/:password', (req, res) => {
    const passwordText: string = req.params.password;
    const storageAdapter = new HttpAdapter("https://pwlist.cfapps.eu10.hana.ondemand.com/passwords.txt")
    const passwordListProvider: PasswordList = new PasswordList(storageAdapter);
    passwordListProvider.findAsync(passwordText).then((isFound: boolean) => {
        res.send(`Score for ${passwordText} is: ${isFound ? "common" : "uncommon"}`);
    });
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

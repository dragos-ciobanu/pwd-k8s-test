import express from 'express';
import {HttpAdapter} from "./HttpAdapter";
import {PasswordList} from "./PasswordList";

const app = express();
const port = process.env.PORT || 3002;

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Password is common service');
});

app.post("/api/password/common", async (req, res, next) => {
    try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Credentials', 'true');

        const passwordText: string = req.body.password;
        const storageAdapter = new HttpAdapter("https://pwlist.cfapps.eu10.hana.ondemand.com/passwords.txt")
        const passwordListProvider: PasswordList = new PasswordList(storageAdapter);
        passwordListProvider.findAsync(passwordText).then((isFound: boolean) => {
            const response = {
                isCommon: isFound
            };

            res.json(response);
        });
    } catch (error) {
        next(error)
    }
});

app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
});

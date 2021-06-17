import express from 'express';
import {PasswordScore} from "./PasswordScore";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.post("/api/password/score", async (req, res, next) => {
    try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        const passwordText: string = req.body.password;

        const passwordScore = PasswordScore.getScore(passwordText);
        const response = {
            score: passwordScore
        };
        res.json(response);
    } catch (error) {
        next(error)
    }
});

app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
});

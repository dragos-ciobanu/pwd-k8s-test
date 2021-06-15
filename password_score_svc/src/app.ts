import express from 'express';
import {PasswordScore} from "./PasswordScore";

const app = express();
const port = 3000;

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.get('/api/password/score/:password', (req, res) => {
    const passwordText: string = req.params.password;
    const passwordScore = PasswordScore.getScore(passwordText);
    res.send(`Score for ${passwordText} is: ${passwordScore}`);
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

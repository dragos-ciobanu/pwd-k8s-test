import express from 'express';

const app = express();
const port = 3000;

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Password score service');
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

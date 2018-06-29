import app from "./app";

const port = 3000 ;


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(`Something broke!`);
});

app.listen(port, () => {
    console.log(`Listen from port : ${port}`);
});


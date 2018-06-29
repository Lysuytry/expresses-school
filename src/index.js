import app from "./app";

const port = 3000 ;


app.use((err, req, res, next) => {
    console.error(err.stack);
    next(err);
});

app.listen(port, () => {
    console.log(`Listen from port : ${port}`);
});


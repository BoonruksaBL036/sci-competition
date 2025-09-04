import express from "express";

const PORT = 5000;
const app =  express();
app.use(express.json());
app.use(express.urlencoded({ extends: true}));

app.get("/hello",(req, res) => {
    return res.send("Hello world!");
});

app.listen(PORT,() => {
    console.log("Listening to http://localhost:" + PORT);
})
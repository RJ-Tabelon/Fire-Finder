// made by Dia Fallon on 3/19
// This will function as the main file for the backend of the project

// To run this through terminal, cd into backend folder and then enter
// node .\backend\server.js
// or
// npm run dev

// import and export syntax available from "type": "module", in package.json
import express from 'express';

const app = express();

app.get("/", (req,res) => {
    res.send("Server is ready");
});

app.listen(5001, () => {
    console.log('Server started at http://localhost:5001');
});
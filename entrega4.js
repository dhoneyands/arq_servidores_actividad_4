require("dotenv").config();

const express = require("express");
const app = express();

require("./config/db.config");

app.use(express.json());

const router = require("./config/routes.config");
app.use(router);



app.listen(8080, () => {
    console.log("Server is running on port 8080");
}); 
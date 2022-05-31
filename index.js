require('dotenv').config();
const express = require("express");
const sequelize = require("./db");
const router = require("./routers/router");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors({
    origin : ["https://test-my-applications.herokuapp.com","http://localhost:8080/"],
}));
app.use("/api",router);
    
app.use(errorHandler);

const start = async () => {
    try {
        sequelize.authenticate();
        sequelize.sync();
        app.listen(PORT,() => {
            console.log(`Server start on ${PORT} port`);
        })
    } catch (err) {
        console.log(err);
    }
}
start();
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        service: process.env.APP_NAME,
        status: "Running"
    });
});

app.post("/api/login", (req, res) => {

    const { username, password } = req.body;

    if (username === "admin" && password === "admin123") {

        return res.json({
            success: true,
            token: "sample-jwt-token",
            user: {
                id: 1,
                name: "Dhanush karthick R",
                role: "Admin"
            }
        });

    }

    return res.status(401).json({
        success: false,
        message: "Invalid Username or Password"
    });

});

const PORT = process.env.PORT;

app.listen(PORT, () => {

    console.log(`${process.env.APP_NAME} running on port ${PORT}`);

});
const express = require("express");
require("dotenv").config();
const app = express();
const connectMongoDB = require("./config/mongodb")
const cookieParser = require("cookie-parser");
const validateToken = require("./middleware/validation.token.js");
const createTask = require("./controllers/task.controller");


app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

const PORT = process.env.PORT || 8000;

async function startServer() {
    try {

        await connectMongoDB();

        app.listen(PORT, () => {
            console.log("Server running on port: " + PORT);
        })
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

app.use('/api/auth', require('./routes/auth.route.js'));
app.use('/api/user', require('./routes/user.route.js'));
app.use('/api/tasks', validateToken, require('./routes/task.route.js'));

startServer();


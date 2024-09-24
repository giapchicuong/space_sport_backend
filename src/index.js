require("dotenv").config();
import express from "express";
import initApiRoutes from "./routes/api";
import configCors from "./config/cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();

const PORT = process.env.PORT || 8080;

// config corn
configCors(app);

// config body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// config cookie parser
app.use(cookieParser());


// init web routes
initApiRoutes(app);

app.use((req, res) => {
    return res.send("404 not found");
});

app.listen(PORT, () => {
    console.log("Backend running on the port = " + PORT);
});
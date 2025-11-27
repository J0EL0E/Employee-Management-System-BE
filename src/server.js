import express from "express";
import "dotenv/config";
import cors from "cors";
import { corsConfig } from "./config/cors.js";
import cookieParser from "cookie-parser";
import { routes } from "./routes/index.js";
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 4000;

//Middlewares
app.use(cors(corsConfig));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Routes
app.use("/api/v1", routes.userRouter);
app.use("/api/v1", routes.employeeRouter);

app.get("/", async (req, res) => {
    // const result = await pool.query("SELECT current_database()");
    // res.send(`The database name is : ${result.rows[0].current_database} `);
    res.send(`Welcome to Employee API v1`);
});

//Errorhandler
app.use(errorHandler);

app.listen(PORT, () =>{
    console.log(`Listening from port ${PORT}`)
})



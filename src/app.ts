import * as dotenv from "dotenv";
import express from "express";
import * as bodyParser from "body-parser";
import { recipeRouter } from "./router/recipeRouter";

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use("/recipes", recipeRouter);

app.listen(process.env.PORT, () => {
console.log("Node server started running");
});
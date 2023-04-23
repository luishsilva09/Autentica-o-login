import cors from "cors";
import express from "express";
import "express-async-errors";

const app = express();
app.use(cors(), express.json());

export default app;

import cors from "cors";
import express from "express";
import "express-async-errors";
import routes from "./routes";

const app = express();
app.use(cors(), express.json());
app.use(routes);

export default app;

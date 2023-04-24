import cors from "cors";
import express from "express";
import "express-async-errors";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware";
import routes from "./routes";

const app = express();
app.use(cors(), express.json());
app.use(routes);
app.use(errorHandlerMiddleware);

export default app;

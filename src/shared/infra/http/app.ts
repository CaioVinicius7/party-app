/* eslint-disable @typescript-eslint/no-unused-vars */
import "dotenv/config";
import "express-async-errors";
import "reflect-metadata";

import cors from "cors";
import Express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

import "@shared/container";
import { AppError } from "@shared/errors/AppError";

import swaggerFile from "../../../swagger.json";
import { router } from "./routes";

const app = Express();

app.use(cors());
app.use(Express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof AppError) {
		return res.status(err.statusCode).json({
			message: err.message
		});
	}
});

export { app };

import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import process from "process";

import { AppError } from "@shared/errors/AppError";

interface IPayload {
	sub: string;
	name: string;
	email: string;
}

async function ensureAuthenticateClient(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		throw new AppError("Token missing!", 401);
	}

	const [, token] = authHeader.split(" ");

	try {
		const { sub, name, email } = verify(
			token,
			process.env.JWT_SECRET as string
		) as IPayload;

		req.user = {
			id: sub,
			name,
			email
		};

		return next();
	} catch (err) {
		console.log(err);

		throw new AppError("Invalid token!", 401);
	}
}

export { ensureAuthenticateClient };

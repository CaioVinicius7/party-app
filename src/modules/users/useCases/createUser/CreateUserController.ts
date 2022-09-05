import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
	async handle(req: Request, res: Response): Promise<Response> {
		const { name, email, phone, password } = req.body;

		const createUserUseCase = container.resolve(CreateUserUseCase);

		const result = await createUserUseCase.execute({
			name,
			email,
			phone,
			password
		});

		return res.status(201).json(result);
	}
}

export { CreateUserController };

import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
	async handle(req: Request, res: Response) {
		const { name, email, password } = req.body;

		const createUserUseCase = container.resolve(CreateUserUseCase);

		const result = await createUserUseCase.execute({
			name,
			email,
			password
		});

		return res.status(201).json(result);
	}
}

export { CreateUserController };
import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreatePartyUseCase } from "./CreatePartyUseCase";

class CreatePartyController {
	async handle(req: Request, res: Response) {
		const { id: userId } = req.user;
		const { name, banner, price, coordination, description, date } = req.body;

		const createPartyUseCase = container.resolve(CreatePartyUseCase);

		const result = await createPartyUseCase.execute({
			name,
			banner,
			price,
			coordination,
			description,
			date,
			userId
		});

		return res.status(201).json(result);
	}
}

export { CreatePartyController };

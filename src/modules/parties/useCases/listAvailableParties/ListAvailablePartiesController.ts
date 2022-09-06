import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAvailablePartiesUseCase } from "./ListAvailablePartiesUseCase";

class ListAvailablePartiesController {
	async handle(req: Request, res: Response): Promise<Response> {
		const listAvailablePartiesUseCase = container.resolve(
			ListAvailablePartiesUseCase
		);

		const result = await listAvailablePartiesUseCase.execute();

		return res.status(200).json(result);
	}
}

export { ListAvailablePartiesController };

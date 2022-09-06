import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetUserProfileUseCase } from "./GetUserProfileUseCase";

class GetUserProfileController {
	async handle(req: Request, res: Response): Promise<Response> {
		const { id } = req.user;

		const getUserProfileUseCase = container.resolve(GetUserProfileUseCase);

		const result = await getUserProfileUseCase.execute(id);

		return res.status(200).json(result);
	}
}

export { GetUserProfileController };

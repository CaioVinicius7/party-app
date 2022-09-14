import { Request, Response } from "express";
import { container } from "tsyringe";
import { DisconfirmPartyPresenceUseCase } from "./DisconfirmPartyPresenceUseCase";

class DisconfirmPartyPresenceController {
	async handle(req: Request, res: Response): Promise<Response> {
		const { id } = req.body;

		const disconfirmPartyPresenceUseCase = container.resolve(
			DisconfirmPartyPresenceUseCase
		);

		const result = await disconfirmPartyPresenceUseCase.execute(id);

		return res.status(200).json(result);
	}
}

export { DisconfirmPartyPresenceController };

import { Request, Response } from "express";
import { container } from "tsyringe";
import { ConfirmPartyPresenceUseCase } from "./ConfirmPartyPresenceUseCase";

class ConfirmPartyPresenceController {
	async handle(req: Request, res: Response): Promise<Response> {
		const { id } = req.user;
		const { partyId } = req.body;

		const confirmPartyPresenceUseCase = container.resolve(
			ConfirmPartyPresenceUseCase
		);

		const result = await confirmPartyPresenceUseCase.execute(id, partyId);

		return res.status(201).json(result);
	}
}

export { ConfirmPartyPresenceController };

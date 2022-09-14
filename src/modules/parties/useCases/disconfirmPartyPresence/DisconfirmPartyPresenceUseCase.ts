import { IPartyPresenceRepository } from "@modules/parties/repositories/IPartyPresenceRepository";
import { PartyPresence } from "@prisma/client";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class DisconfirmPartyPresenceUseCase {
	constructor(
		@inject("PartyPresenceRepository")
		private partyPresenceRepository: IPartyPresenceRepository
	) {}

	async execute(id: string): Promise<PartyPresence> {
		const partyConfirmation = await this.partyPresenceRepository.findById(id);

		if (!partyConfirmation) {
			throw new AppError("A party confirmation with this id not exists!");
		}

		const deletedPartyConfirmation = await this.partyPresenceRepository.delete(
			id
		);

		return deletedPartyConfirmation;
	}
}

export { DisconfirmPartyPresenceUseCase };

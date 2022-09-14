import { IPartyConfirmationRepository } from "@modules/parties/repositories/IPartyConfirmationRepository";
import { PartyConfirmation } from "@prisma/client";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class DisconfirmPartyPresenceUseCase {
	constructor(
		@inject("PartyConfirmationRepository")
		private partyConfirmationRepository: IPartyConfirmationRepository
	) {}

	async execute(id: string): Promise<PartyConfirmation> {
		const partyConfirmation = await this.partyConfirmationRepository.findById(
			id
		);

		if (!partyConfirmation) {
			throw new AppError("A party confirmation with this id not exists");
		}

		const deletedPartyConfirmation =
			await this.partyConfirmationRepository.delete(id);

		return deletedPartyConfirmation;
	}
}

export { DisconfirmPartyPresenceUseCase };
